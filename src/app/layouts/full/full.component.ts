import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";

@Component({
  selector: "app-full-layout",
  templateUrl: "full.component.html",
  styleUrl: "full.component.less",
  imports: [AppHeaderComponent, RouterOutlet, AppFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFullLayoutComponent {}
