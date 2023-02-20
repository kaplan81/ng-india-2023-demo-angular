import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app/app.component';

const initializeAppConfigFactory = (): (() => Observable<null>) => () => {
  console.log('initializeAppConfigFactory in shell');
  return of(null);
};

bootstrapApplication(AppComponent, {
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfigFactory,
    },
  ],
});
