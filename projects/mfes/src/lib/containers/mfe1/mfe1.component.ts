import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mfe-mfe1',
  standalone: true,
  styleUrls: ['./mfe1.component.scss'],
  templateUrl: './mfe1.component.html',
})
export class Mfe1Component {}
