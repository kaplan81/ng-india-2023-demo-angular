import { AsyncPipe, DOCUMENT, NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  Type,
  ViewChild,
} from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, AsyncPipe],
  selector: 'shl-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  static readonly componentAttrEquals = 'component=';
  static readonly hostElementTag = 'rqe-host';
  @ViewChild('customElementHolder') customElementHolder!: ElementRef;
  #document: Document = inject(DOCUMENT);
  hasAppendedElement$ = new BehaviorSubject<boolean>(false);
  @Input() id = '';
  #injector = inject(Injector);
  #router = inject(Router);

  constructor() {
    this.defineRqeHost(this.#injector);
  }

  ngAfterViewInit(): void {
    this.loadSnippet();
  }

  private defineRqeHost(
    inj: Injector,
    cmp: Type<any> = AppComponent,
    tag: string = AppComponent.hostElementTag,
  ): void {
    if (customElements.get(tag) === undefined) {
      const hostElement: NgElementConstructor<AppComponent> = createCustomElement(cmp, {
        injector: inj,
      });
      customElements.define(tag, hostElement);
    }
  }

  private loadSnippet(): void {
    if (this.customElementHolder !== undefined) {
      let componentPath: string = this.#router.routerState.snapshot.url.substring(1);
      const indexOfQuery: number = componentPath.indexOf('?');
      // When the URL contains query params.
      if (indexOfQuery !== -1) {
        componentPath = componentPath.substring(0, indexOfQuery);
      }
      try {
        const fragment: DocumentFragment = this.#document
          .createRange()
          .createContextualFragment(
            `<${AppComponent.hostElementTag} ${AppComponent.componentAttrEquals}"${componentPath}"></${AppComponent.hostElementTag}>`,
          );
        this.customElementHolder.nativeElement.appendChild(fragment);
        setTimeout(() => {
          this.hasAppendedElement$.next(true);
        }, 0);
      } catch (error: unknown) {
        console.error('Error while loading external snippet', error);
      }
    }
  }
}
