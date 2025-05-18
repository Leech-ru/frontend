import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiActiveZone } from "@taiga-ui/cdk/directives/active-zone";
import { TuiObscured } from "@taiga-ui/cdk/directives/obscured";
import { TuiButton, TuiDropdown } from "@taiga-ui/core";
import { TuiChevron } from "@taiga-ui/kit";

@Component({
  standalone: true,
  selector: "app-footer",
  imports: [TuiActiveZone, TuiButton, TuiChevron, TuiDropdown, TuiObscured],
  templateUrl: "footer.component.html",
  styleUrl: "footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {}
