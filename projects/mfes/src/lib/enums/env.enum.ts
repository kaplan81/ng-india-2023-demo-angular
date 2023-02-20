export enum Env {
  dev,
  local,
  prod,
  stag,
}
export type EnvET = keyof typeof Env;
