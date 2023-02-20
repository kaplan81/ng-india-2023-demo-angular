import { loadRemoteModule } from '@angular-architects/module-federation';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  inject,
  Injector,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
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
  @Input() exposed: string | null = null;
  @ViewChild('placeHolder', { read: ViewContainerRef }) placeHolder!: ViewContainerRef;
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

  private async loadComponent(): Promise<any> {
    if (this.exposed !== null) {
      const asyncModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: this.exposed,
      });
      const moduleName: string = Object.keys(asyncModule)[0];
      const module = asyncModule[moduleName];
      const componentRef: ComponentRef<HTMLElement> = this.placeHolder.createComponent(module);
      // this.dataAttributes(componentRef.instance);
    }
  }
}
