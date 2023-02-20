import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigFile } from '../../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  #http = inject(HttpClient);

  loadConfig(): Observable<ConfigFile> {
    const url = 'config/config.json';
    return this.#http.get<ConfigFile>(url);
  }
}
