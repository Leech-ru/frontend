import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiRoot } from "@taiga-ui/core";

import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";

@Component({
  selector: "app-root",
  imports: [AppHeaderComponent, RouterOutlet, TuiRoot, AppFooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.less",
})
export class AppComponent {
  title = "frontend";
}
