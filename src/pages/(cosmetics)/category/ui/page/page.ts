import { AppCosmeticItemCardComponent, CategoryDto } from "@/entities/cosmetic";
import { AppHeroComponent } from "@/shared/ui";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiItem } from "@taiga-ui/cdk";
import { TUI_BREAKPOINT, TuiLink } from "@taiga-ui/core";
import { TuiBreadcrumbs, TuiFade } from "@taiga-ui/kit";

@Component({
  styleUrl: "page.less",
  templateUrl: "page.html",
  imports: [
    AppCosmeticItemCardComponent,
    AppHeroComponent,
    TuiFade,
    RouterLink,
    TuiBreadcrumbs,
    TuiItem,
    TuiLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsCategoryPageComponent {
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly category = input.required<CategoryDto>();

  protected readonly mockItems = computed(() => [
    {
      category: this.category().name,
      desc: "Нежная гелевая маска для лица и шеи обеспечивает мгновенный, ярко-выраженный лифтинг-эффект, усиливающийся по мере высыхания.  Учитывая потребности кожи, маска создает эстетический эффект гладкости и подтянутости, превосходно увлажняет, сокращает морщины и размер пор",
      id: "1",
      image_link:
        "https://leech.ru/upload/pages/ru/0_39628700_1737511654_img.jpg",
      name: "Маска красоты «Мгновенный лифтинг и увлажнение»",
    },
    {
      category: this.category().name,
      desc: "Нежная гелевая маска для лица и шеи обеспечивает мгновенный, ярко-выраженный лифтинг-эффект, усиливающийся по мере высыхания.  Учитывая потребности кожи, маска создает эстетический эффект гладкости и подтянутости, превосходно увлажняет, сокращает морщины и размер пор",
      id: "2",
      image_link:
        "https://leech.ru/upload/pages/ru/0_39628700_1737511654_img.jpg",
      name: "Маска красоты «Мгновенный лифтинг и увлажнение»",
    },
    {
      category: this.category().name,
      desc: "Нежная гелевая маска для лица и шеи обеспечивает мгновенный, ярко-выраженный лифтинг-эффект, усиливающийся по мере высыхания.  Учитывая потребности кожи, маска создает эстетический эффект гладкости и подтянутости, превосходно увлажняет, сокращает морщины и размер пор",
      id: "3",
      image_link:
        "https://leech.ru/upload/pages/ru/0_39628700_1737511654_img.jpg",
      name: "Маска красоты «Мгновенный лифтинг и увлажнение»",
    },
    {
      category: this.category().name,
      desc: "Нежная гелевая маска для лица и шеи обеспечивает мгновенный, ярко-выраженный лифтинг-эффект, усиливающийся по мере высыхания.  Учитывая потребности кожи, маска создает эстетический эффект гладкости и подтянутости, превосходно увлажняет, сокращает морщины и размер пор",
      id: "4",
      image_link:
        "https://leech.ru/upload/pages/ru/0_39628700_1737511654_img.jpg",
      name: "Маска красоты «Мгновенный лифтинг и увлажнение»",
    },
  ]);
}
