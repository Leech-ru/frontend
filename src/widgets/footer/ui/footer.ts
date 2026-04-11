import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiDropdown, TuiLink } from "@taiga-ui/core";
import { FOOTER_CONTENT } from "../config/footer.config";

@Component({
  standalone: true,
  selector: "app-footer",
  imports: [RouterLink, TuiLink, TuiDropdown],
  templateUrl: "footer.html",
  styleUrl: "footer.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  protected readonly footer = FOOTER_CONTENT;
}
