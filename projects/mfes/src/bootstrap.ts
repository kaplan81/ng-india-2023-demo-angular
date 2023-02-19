import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mfe-root',
  standalone: true,
  template: '',
})
export class AppComponent {}

bootstrapApplication(AppComponent);
