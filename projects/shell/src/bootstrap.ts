import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ConfigFile } from '../../mfes/src/lib/models/config.model';
import { ConfigService } from '../../mfes/src/lib/services/config/config.service';
import { AppComponent } from './app/app.component';

const initializeAppConfigFactory =
  (configService: ConfigService): (() => Observable<ConfigFile>) =>
  () => {
    // This will get outputted.
    console.log('initializeAppConfigFactory in shell');
    return configService.loadConfig();
  };

/**
 * Theoretically we can perform initializations here
 * but they were never be retrieved by the remote components
 * because this is not its app and their app has
 * a different root injector.
 */
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      deps: [ConfigService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: initializeAppConfigFactory,
    },
  ],
});
