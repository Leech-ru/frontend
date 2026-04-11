import { CONTACT_SERVICES } from "@/entities/info";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
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
  protected readonly services = CONTACT_SERVICES;
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
}
