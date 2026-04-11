import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  templateUrl: "full.html",
  styleUrl: "full.less",
  imports: [AppHeaderComponent, RouterOutlet, AppFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFullLayoutComponent {}
