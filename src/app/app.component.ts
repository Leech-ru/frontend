import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiRoot } from "@taiga-ui/core";

import { AppHeaderComponent } from "@/widgets/header";

@Component({
  selector: "app-root",
  imports: [AppHeaderComponent, RouterOutlet, TuiRoot],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "frontend";
}
