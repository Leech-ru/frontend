import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from "@taiga-ui/i18n";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideEventPlugins(),
    {
      provide: TUI_LANGUAGE,
      useValue: TUI_RUSSIAN_LANGUAGE,
    },
  ],
};
