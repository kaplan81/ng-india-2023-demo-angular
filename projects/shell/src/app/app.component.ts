import { AsyncPipe, NgClass } from '@angular/common';
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
import { BehaviorSubject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, AsyncPipe],
  selector: 'shl-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  static readonly hostElementTag = 'shl-host';
  @Input() component: string | null = null;
  @ViewChild('customElementHolder') customElementHolder!: ElementRef;
  hasAppendedElement$ = new BehaviorSubject<boolean>(false);
  #injector = inject(Injector);

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
}
