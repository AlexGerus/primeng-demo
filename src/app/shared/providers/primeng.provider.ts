import { PrimeNGConfig } from 'primeng/api';
import { APP_INITIALIZER } from '@angular/core';

const factory = (primengConfig: PrimeNGConfig) => {
  return () => {
    primengConfig.ripple = true;
    primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    };
  };
};

export const primeNgProvider = {
  provide: APP_INITIALIZER,
  useFactory: factory,
  deps: [PrimeNGConfig],
  multi: true
};
