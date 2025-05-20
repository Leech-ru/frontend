import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiAppearance, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiCell, TuiHeader } from "@taiga-ui/layout";

import { CONTACT_SERVICES } from "../config/contact.config";

@Component({
  selector: "app-contact",
  templateUrl: "contact.component.html",
  styleUrl: "contact.component.less",
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
export class AppContactComponent {
  protected readonly services = CONTACT_SERVICES;
}
