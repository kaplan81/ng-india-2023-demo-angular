import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfigFile } from '../../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configs: ConfigFile | null = null;
  #http = inject(HttpClient);

  loadConfig(): Observable<ConfigFile> {
    const url = 'http://localhost:4201/config/config.json';
    return this.#http.get<ConfigFile>(url).pipe(
      tap((configFile: ConfigFile) => {
        this.configs = configFile;
        (window as any).configs = this.configs;
      }),
    );
  }
}
