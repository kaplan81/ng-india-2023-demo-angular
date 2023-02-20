import { inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ConfigFile } from '../models/config.model';
import { Constructor } from '../models/constructor.model';
import { Initializer } from '../models/initializer.model';
import { ConfigService } from '../services/config/config.service';

/**
 * To use when no nested mixins.
 */
export class InitializerBase {}

export const initializerMixin = <T extends Constructor<{}>>(
  Base: T,
  // We can pass values to the initilizer.
  // value: any,
): Constructor<Initializer> & T =>
  class extends Base {
    /**
     * These 3 assignments for configs are a typical
     * way to handle component state with RxJX's BehaviorSubject.
     */
    #configs: ConfigFile | null = null;
    #configs$ = new BehaviorSubject<ConfigFile | null>(this.#configs);
    configs$: Observable<ConfigFile | null> = this.#configs$.asObservable();
    #configService = inject(ConfigService);

    constructor(...args: any[]) {
      super(...args);
      this.#configService
        .loadConfig()
        .pipe(
          tap((configFile: ConfigFile) => {
            console.log('Loading againg configFile in Initializer:::');
            this.#configs$.next((this.#configs = configFile));
          }),
        )
        .subscribe();
    }
  };
