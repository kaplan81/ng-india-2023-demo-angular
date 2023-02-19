import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mfe-mfe1',
  standalone: true,
  styleUrls: ['./mfe2.component.scss'],
  templateUrl: './mfe2.component.html',
})
export class Mfe2Component {}
