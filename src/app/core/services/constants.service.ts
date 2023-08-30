import { InjectionToken } from '@angular/core';

export interface Constants {
  App: string;
  Version: string;
  API_URL: string;
}

export const CONSTANTS_PROVIDER = new InjectionToken<Constants>('ConstantsService');
