import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TuiBreakpointService } from "@taiga-ui/core";

import { AppLeechBuyFormComponent } from "@/features/leech/buy";
import { AppFooterComponent } from "@/widgets/footer";
import { AppHeaderComponent } from "@/widgets/header";

@Component({
  selector: "app-leech-buy-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [AppLeechBuyFormComponent, AppFooterComponent, AppHeaderComponent],
})
export class AppLeechBuyPageComponent {
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService).pipe());
}
