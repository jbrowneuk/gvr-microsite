import { ROOT_PATH } from 'src/variables';

export const environment = {
  production: true
};

export const ENV_PROVIDERS = [{ provide: ROOT_PATH, useValue: '/railway/' }];
