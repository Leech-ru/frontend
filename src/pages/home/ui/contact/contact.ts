import { CONTACT_SERVICES } from "@/entities/info";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  TUI_BREAKPOINT,
  TuiAppearance,
  TuiCell,
  TuiLink,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

@Component({
  selector: "app-home-page-contact",
  templateUrl: "contact.html",
  styleUrl: "contact.less",
  imports: [
    TuiAppearance,
    TuiAvatar,
    TuiCardLarge,
    TuiCell,
    TuiHeader,
    TuiLink,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageContactComponent {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly services = CONTACT_SERVICES;
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly localeId = inject(LOCALE_ID);

  protected readonly mapUrl = computed(() => {
    const lang = this.localeId === "ru" ? "ru_RU" : "en_US";
    const url = `https://yandex.ru/map-widget/v1/?ll=38.049671%2C55.643261&z=17&lang=${lang}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
