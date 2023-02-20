import { ClassProvider, FactoryProvider, InjectionToken } from '@angular/core';

export const isWindow = (element: typeof globalThis | Window | HTMLElement | null): boolean => {
  return element !== null
    ? typeof window !== 'undefined' && Object.prototype.hasOwnProperty.call(element, 'self')
    : false;
};

export const WINDOW = new InjectionToken<Window>('WINDOW');

export abstract class WindowRef {
  get nativeWindow(): Window | Record<string, unknown> {
    throw new Error('Not implemented.');
  }
}

export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  override get nativeWindow(): Window {
    return window as Window;
  }
}

const windowFactory = (browserWindowRef: BrowserWindowRef): Window | object => {
  if (isWindow(globalThis)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
};

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

const windowProvider: FactoryProvider = {
  deps: [WindowRef],
  provide: WINDOW,
  useFactory: windowFactory,
};

export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
