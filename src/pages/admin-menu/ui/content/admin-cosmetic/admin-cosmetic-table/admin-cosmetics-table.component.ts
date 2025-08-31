import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { TuiTable, TuiTableDirective } from "@taiga-ui/addon-table";
import { TuiButton, TuiGroup } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";

import { CosmeticsStore } from "@/entities/cosmetic";
import { AdminRoutes } from "@/shared/config";

@Component({
  selector: "app-admin-menu-cosmetics-table",
  imports: [
    FormsModule,
    TuiTableDirective,
    TuiTable,
    TuiAvatar,
    TuiGroup,
    TuiButton,
    RouterLink,
  ],
  templateUrl: "admin-cosmetics-table.component.html",
  styleUrl: "admin-cosmetics-table.component.less",
})
export class AdminCosmeticsTableComponent {
  protected readonly store = inject(CosmeticsStore);
  protected readonly AdminRoutes = AdminRoutes;
}
