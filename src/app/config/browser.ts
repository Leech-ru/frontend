import { AuthRefreshHttpInterceptor } from "@/entities/auth";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
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
} from "@angular/router";
import { provideTaiga } from "@taiga-ui/core";
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from "@taiga-ui/i18n";
import { routes } from "./routes";

export const browserConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
      withComponentInputBinding(),
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(withEventReplay()),
    provideTaiga({ mode: "light" }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRefreshHttpInterceptor,
      multi: true,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: signal(TUI_RUSSIAN_LANGUAGE),
    },
  ],
};
