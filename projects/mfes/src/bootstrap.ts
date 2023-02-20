import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'mfe-root',
  standalone: true,
  template: '',
})
export class AppComponent {}

bootstrapApplication(AppComponent).catch((err: unknown) => console.error(err));
