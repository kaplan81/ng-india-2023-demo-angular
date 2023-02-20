import { EnvET } from '../enums/env.enum';

export interface ConfigFile {
  env: EnvET;
  app: ConfigFileApp;
}

export interface ConfigFileApp {
  baseUrl: string;
}
