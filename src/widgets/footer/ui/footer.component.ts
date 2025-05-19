import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiDropdown, TuiLink } from "@taiga-ui/core";

import { FOOTER_SECTIONS } from "../config/footer.config";

@Component({
  standalone: true,
  selector: "app-footer",
  imports: [RouterLink, TuiDropdown, TuiLink],
  templateUrl: "footer.component.html",
  styleUrl: "footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  protected readonly sections = FOOTER_SECTIONS;
}
