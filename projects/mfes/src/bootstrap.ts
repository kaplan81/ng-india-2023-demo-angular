import { APP_INITIALIZER, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

const initializeAppConfigFactory = (): (() => Observable<null>) => () => {
  // This is never getting outputted.
  console.log('initializeAppConfigFactory in mfes');
  return of(null);
};

@Component({
  selector: 'mfe-root',
  standalone: true,
  template: '',
})
export class AppComponent {}

/**
 * This is just testing that this part of the code is never getting executed.
 *
 * This is why we cannot have initializations on bootstrap in this mfes project.
 *
 */
bootstrapApplication(AppComponent, {
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfigFactory,
    },
  ],
});
