import { Component, effect, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TuiStringHandler, TuiStringMatcher } from "@taiga-ui/cdk";
import {
  TuiDataListComponent,
  TuiLabel,
  TuiOptionNew,
  TuiOptionWithValue,
  TuiTextfield,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from "@taiga-ui/core";
import { TuiChevron, TuiComboBox } from "@taiga-ui/kit";
import { debounceTime, distinctUntilChanged, filter, map, tap } from "rxjs";

import { CosmeticsFiltersDto, CosmeticsStore } from "@/entities/cosmetic";

@Component({
  selector: "app-admin-cosmetic-filters",
  imports: [
    FormsModule,
    TuiChevron,
    TuiComboBox,
    TuiDataListComponent,
    TuiLabel,
    TuiOptionNew,
    TuiOptionWithValue,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    ReactiveFormsModule,
    TuiTextfield,
  ],
  templateUrl: "admin-cosmetic-filters.component.html",
  styleUrl: "admin-cosmetic-filters.component.less",
})
export class AdminCosmeticFiltersComponent {
  protected readonly store = inject(CosmeticsStore);

  protected searchControl = new FormControl<string>("", { nonNullable: true });
  protected categoryControl = new FormControl<string>("");

  private readonly filters = signal<CosmeticsFiltersDto>({});
  private readonly category = toSignal(this.categoryControl.valueChanges, {
    initialValue: this.categoryControl.value,
  });

  protected readonly stringify: TuiStringHandler<string> = (id) =>
    this.store.categories().find((item) => item.id === id)?.name ?? "";

  protected readonly matcher: TuiStringMatcher<string> = (id, query) => {
    const { name } = this.store.categories().find((item) => item.id === id)!;

    return String(id) === query || name.toLowerCase() === query.toLowerCase();
  };

  public constructor() {
    this.searchControl.valueChanges.pipe(
      map((v) => v.trim()),
      filter((v) => v.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap((search) => {
        this.filters.set({
          ...this.filters(),
          titlePrefix: search,
        });
      }),
    );

    effect(() => {
      const category = this.category();
      if (category) {
        this.filters.set({
          ...this.filters(),
          category_id: category,
        });
      }
    });

    effect(() => {
      const filters = this.filters();
      this.store.loadAll(filters);
    });
  }
}
