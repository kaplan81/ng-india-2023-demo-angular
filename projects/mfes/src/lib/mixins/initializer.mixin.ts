import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ConfigFile } from '../models/config.model';
import { Constructor, ConstructorBase } from '../models/constructor.model';
import { Initializer } from '../models/initializer.model';
import { ConfigService } from '../services/config/config.service';

export const initializerMixin = <T extends ConstructorBase>(
  Base: T,
  // We can pass values to the initilizer.
  // value: any,
): Constructor<Initializer> & T =>
  class extends Base {
    #configService: ConfigService;
    /**
     * These 3 assignments for configs are a typical
     * way to handle component state with RxJX's BehaviorSubject.
     */
    #configs: ConfigFile | null = null;
    #configs$ = new BehaviorSubject<ConfigFile | null>(this.#configs);
    configs$: Observable<ConfigFile | null> = this.#configs$.asObservable();

    /**
     * A mixin class must have a constructor with a single
     * rest parameter of type 'any[]'
     *
     * @param args
     */
    constructor(...args: any[]) {
      super(...args);
      this.#configService = args[0];
      console.log('this.#configService in initializer constructor:::', this.#configService);
      // It is null:
      console.log(
        'this.#configService.configs in initializer constructor:::',
        this.#configService.configs,
      );
      this.#configService
        .loadConfig()
        .pipe(
          tap((configFile: ConfigFile) => {
            /**
             * We loaded configFile previously while bootstraping the shell.
             * However this.#configService.configs is still null in this constructor
             * because the property was assign by another root injector.
             */
            console.log('loading againg configFile in initializer:::');
            this.#configs$.next((this.#configs = configFile));
          }),
        )
        .subscribe();
    }
  };
