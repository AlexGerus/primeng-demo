import { ApplicationConfig } from '@angular/core';
import { primeNgProvider } from './shared/providers/primeng.provider';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [primeNgProvider, provideAnimations()]
};
