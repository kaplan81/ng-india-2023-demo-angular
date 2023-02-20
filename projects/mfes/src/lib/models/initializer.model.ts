import { Observable } from 'rxjs';
import { ConfigFile } from './config.model';

/**
 * Relates to mixin.
 */
export interface Initializer {
  configs$: Observable<ConfigFile | null>;
}
