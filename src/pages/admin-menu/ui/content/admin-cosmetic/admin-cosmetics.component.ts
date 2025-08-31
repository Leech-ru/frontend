import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { CosmeticsStore } from "@/entities/cosmetic";
import { AdminRoutes } from "@/shared/config";

import { AdminCosmeticFiltersComponent } from "./admin-cosmetic-filters/admin-cosmetic-filters.component";
import { AdminCosmeticsTableComponent } from "./admin-cosmetic-table/admin-cosmetics-table.component";

@Component({
  selector: "app-admin-menu-cosmetics",
  imports: [
    FormsModule,
    TuiButton,
    RouterLink,
    AdminCosmeticsTableComponent,
    ReactiveFormsModule,
    AdminCosmeticFiltersComponent,
  ],
  templateUrl: "admin-cosmetics.component.html",
  styleUrl: "admin-cosmetics.component.less",
})
export class AdminCosmeticsComponent {
  protected readonly store = inject(CosmeticsStore);

  protected readonly AdminRoutes = AdminRoutes;
}
