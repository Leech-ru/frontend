import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TUI_DEFAULT_MATCHER } from "@taiga-ui/cdk";
import { TuiTextfield, TuiTitle } from "@taiga-ui/core";
import { TuiSearchResults } from "@taiga-ui/experimental";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCell, TuiInputSearch } from "@taiga-ui/layout";
import { filter, map, startWith, switchMap, timer } from "rxjs";

import { CosmeticItem } from "@/entities/cosmetic";
import { TEST_DATA } from "@/features/cosmetics/search";

const DATA = TEST_DATA;

@Component({
  selector: "app-cosmetic-search",
  templateUrl: "search.component.html",
  styleUrl: "search.component.less",
  imports: [
    TuiInputSearch,
    TuiTextfield,
    TuiSearchResults,
    ReactiveFormsModule,
    AsyncPipe,
    TuiCell,
    TuiAvatar,
    TuiTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsSearchComponent {
  protected open = false;

  private filter(query: string): Record<string, readonly CosmeticItem[]> {
    return Object.entries(DATA).reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value.filter(({ name, description, guide = "" }) =>
          TUI_DEFAULT_MATCHER(name + description + guide, query),
        ),
      }),
      {},
    );
  }

  protected readonly searchControl = new FormControl("");

  protected readonly results = this.searchControl.valueChanges.pipe(
    filter(Boolean),
    switchMap((value: string) =>
      timer(2000).pipe(
        map(() => this.filter(value)),
        startWith(null),
      ),
    ),
  );
}
