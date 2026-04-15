import { ApplicationConfig, signal } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { UNIVERSAL_PROVIDERS } from "@ng-web-apis/universal";
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from "@taiga-ui/i18n";

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ...UNIVERSAL_PROVIDERS,
    {
      provide: TUI_LANGUAGE,
      useValue: signal(TUI_RUSSIAN_LANGUAGE),
    },
  ],
};
