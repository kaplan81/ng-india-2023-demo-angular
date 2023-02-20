import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ConfigService } from '../../services/config/config.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [HttpClientModule],
  providers: [ConfigService],
  selector: 'mfe-mfe1',
  standalone: true,
  styleUrls: ['./mfe1.component.scss'],
  templateUrl: './mfe1.component.html',
})
export class Mfe1Component implements OnInit {
  #configService = inject(ConfigService);

  ngOnInit(): void {
    console.log('ngOnInit Mfe1Component');
    console.log('this.#configService.configs:::', this.#configService.configs);
  }
}
