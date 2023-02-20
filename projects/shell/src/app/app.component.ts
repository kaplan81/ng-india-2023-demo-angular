import { AsyncPipe, DOCUMENT, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  Input,
  OnInit,
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
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  static readonly componentAttrEquals = 'component=';
  static readonly hostElementTag = 'shl-host';
  @Input() component: string | null = null;
  @ViewChild('customElementHolder') customElementHolder!: ElementRef;
  #document: Document = inject(DOCUMENT);
  hasAppendedElement$ = new BehaviorSubject<boolean>(false);
  @Input() id = '';
  #injector = inject(Injector);
  #router = inject(Router);

  constructor() {
    this.defineHost(this.#injector);
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  private defineHost(
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

  private loadComponent(): void {
    if (this.component !== null) {
      console.log('WE HAVE COMPONENT INPUT', this.component);
      // const external: ExternalModule = await externalModule(this.component);
      // const componentRef: ComponentRef<HTMLElement> = this.placeHolder.createComponent(
      //   external.module,
      // );
      // this.dataAttributes(componentRef.instance);
    }
  }

  private loadSnippet(): void {
    if (this.customElementHolder !== undefined) {
      /** Original implementation from the local app */
      // let componentPath: string = this.#router.routerState.snapshot.url.substring(1);
      // const indexOfQuery: number = componentPath.indexOf('?');
      // // When the URL contains query params.
      // if (indexOfQuery !== -1) {
      //   componentPath = componentPath.substring(0, indexOfQuery);
      // }
      // try {
      //   const fragment: DocumentFragment = this.#document
      //     .createRange()
      //     .createContextualFragment(
      //       `<${AppComponent.hostElementTag} ${AppComponent.componentAttrEquals}"${componentPath}"></${AppComponent.hostElementTag}>`,
      //     );
      //   this.customElementHolder.nativeElement.appendChild(fragment);
      //   setTimeout(() => {
      //     this.hasAppendedElement$.next(true);
      //   }, 0);
      // } catch (error: unknown) {
      //   console.error('Error while loading external snippet', error);
      // }
    }
  }
}
