import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiActiveZone } from "@taiga-ui/cdk/directives/active-zone";
import { TuiObscured } from "@taiga-ui/cdk/directives/obscured";
import { TuiButton, TuiDropdown, TuiLink } from "@taiga-ui/core";
import { TuiChevron } from "@taiga-ui/kit";

import { FOOTER_SECTIONS } from "../config/footer.config";

@Component({
  standalone: true,
  selector: "app-footer",
  imports: [
    TuiActiveZone,
    TuiButton,
    TuiChevron,
    TuiDropdown,
    TuiObscured,
    TuiLink,
    RouterLink,
  ],
  templateUrl: "footer.component.html",
  styleUrl: "footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  protected readonly sections = FOOTER_SECTIONS;
}
