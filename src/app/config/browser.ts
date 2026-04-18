import { authRefreshInterceptor } from "@/entities/auth";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { ApplicationConfig, signal } from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from "@angular/router";
import { provideTaiga } from "@taiga-ui/core";
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from "@taiga-ui/i18n";

import { routes } from "./routes";

export const browserConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({ paramsInheritanceStrategy: "always" }),
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
      withComponentInputBinding(),
    ),
    provideHttpClient(withFetch(), withInterceptors([authRefreshInterceptor])),
    provideClientHydration(withEventReplay()),
    provideTaiga({ mode: "light" }),
    {
      provide: TUI_LANGUAGE,
      useValue: signal(TUI_RUSSIAN_LANGUAGE),
    },
  ],
};
