import { loadRemoteModule } from '@angular-architects/module-federation';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  inject,
  Injector,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, AsyncPipe],
  selector: 'shl-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  static readonly hostElementTag = 'shl-host';
  @Input() exposed: string | null = null;
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #injector = inject(Injector);
  @ViewChild('placeHolder', { read: ViewContainerRef }) placeHolder!: ViewContainerRef;

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

  private async loadComponent(): Promise<any> {
    if (this.exposed !== null) {
      const asyncModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: JSON.parse(this.exposed),
      });
      const moduleName: string = Object.keys(asyncModule)[0];
      const module = asyncModule[moduleName];
      const componentRef: ComponentRef<HTMLElement> = this.placeHolder.createComponent(module);
      this.setAttributes(componentRef);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  private setAttributes(cmpRef: ComponentRef<HTMLElement>): void {
    const attributes: NamedNodeMap = this.#elementRef.nativeElement.attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute: Attr | null = attributes.item(i);
      if (attribute !== null) {
        if (!['exposed', 'ng-version'].includes(attribute.name)) {
          cmpRef.setInput(attribute.name, attribute.value);
        }
      }
    }
  }
}
