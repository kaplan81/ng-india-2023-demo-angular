import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ConfigFile } from '../../models/config.model';
import { WINDOW, WINDOW_PROVIDERS } from '../../services/window/window.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [...WINDOW_PROVIDERS],
  selector: 'mfe-mfe2',
  standalone: true,
  styleUrls: ['./mfe2.component.scss'],
  templateUrl: './mfe2.component.html',
})
export class Mfe2Component implements OnInit {
  #window = inject(WINDOW);

  ngOnInit(): void {
    console.log('ngOnInit Mfe2Component');
    console.log('this.#window.configs', (this.#window as Window & { configs: ConfigFile }).configs);
  }
}
