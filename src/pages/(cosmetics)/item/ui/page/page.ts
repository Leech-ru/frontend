import { CategoryDto } from "@/entities/cosmetic";
import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TUI_BREAKPOINT, TuiButton, TuiLink } from "@taiga-ui/core";
import { TuiAccordion, TuiBreadcrumbs } from "@taiga-ui/kit";
import { TuiAppBarDirective } from "@taiga-ui/layout";
import { AppCosmeticsItemShopsComponent } from "../shops";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    TuiBreadcrumbs,
    TuiLink,
    RouterLink,
    TuiButton,
    TuiAccordion,
    TuiAppBarDirective,
    AppCosmeticsItemShopsComponent,
  ],
})
export class AppCosmeticsItemPageComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly category = input.required<CategoryDto>();
}
