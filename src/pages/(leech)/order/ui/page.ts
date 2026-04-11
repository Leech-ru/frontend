import { AppLeechOrderFormComponent } from "@/features/(leech)/order";
import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";
import { Component, inject } from "@angular/core";
import { TUI_BREAKPOINT } from "@taiga-ui/core";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [AppLeechOrderFormComponent, AppFooterComponent, AppHeaderComponent],
})
export class AppLeechOrderPageComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
}
