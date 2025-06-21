import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { UNIVERSAL_PROVIDERS } from "@ng-web-apis/universal";
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from "@taiga-ui/i18n";

import { routes } from "@/app/app.routes";

import { appConfig } from "./app.config";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    UNIVERSAL_PROVIDERS,
    {
      provide: TUI_LANGUAGE,
      useValue: TUI_RUSSIAN_LANGUAGE,
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
