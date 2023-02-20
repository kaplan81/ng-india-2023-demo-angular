import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mfe-mfe2',
  standalone: true,
  styleUrls: ['./mfe2.component.scss'],
  templateUrl: './mfe2.component.html',
})
export class Mfe2Component implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit Mfe2Component');
  }
}
