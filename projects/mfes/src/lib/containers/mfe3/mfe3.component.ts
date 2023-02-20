import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'mfe-mfe3',
  standalone: true,
  styleUrls: ['./mfe3.component.scss'],
  templateUrl: './mfe3.component.html',
})
export class Mfe3Component implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit Mfe3Component');
  }
}
