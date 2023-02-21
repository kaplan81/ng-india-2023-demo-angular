import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { filter, take } from 'rxjs';
import { MixinBase } from '../../bases/mixin.base';
import { initializerMixin } from '../../mixins/initializer.mixin';
import { ConfigFile } from '../../models/config.model';
import { ConfigService } from '../../services/config/config.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [HttpClientModule],
  providers: [ConfigService],
  selector: 'mfe-mfe3',
  standalone: true,
  styleUrls: ['./mfe3.component.scss'],
  templateUrl: './mfe3.component.html',
})
export class Mfe3Component extends initializerMixin(MixinBase) implements OnInit {
  constructor() {
    super(inject(ConfigService));
  }

  ngOnInit(): void {
    console.log('ngOnInit Mfe3Component');
    this.configs$
      .pipe(
        filter((configs: ConfigFile | null) => configs !== null),
        take(1),
      )
      .subscribe((configs: ConfigFile | null) =>
        console.log('configs in ngOnInit Mfe3Component subscription', configs),
      );
  }
}
