import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  isDevMode,
  APP_INITIALIZER,
  inject,
} from '@angular/core';
import {
  NoPreloading,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { ConfigService } from '@core/services';

// i18n: if you need localisation, add @angular/localize early — retrofitting it
// requires changes across the entire build pipeline (tsconfig, polyfills, server).
// Run: ng add @angular/localize

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // Preloading is disabled by default. Switch to PreloadAllModules or a custom
    // QuicklinkStrategy once the app has multiple lazy-loaded routes worth prefetching.
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withPreloading(NoPreloading)
    ),
    provideHttpClient(withFetch()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const configService = inject(ConfigService);
        return () => configService.loadConfig();
      },
      multi: true,
    },
  ],
};
