import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  TuiAppearance,
  TuiButton,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiRadioList } from "@taiga-ui/kit";
import { TuiCardLarge, TuiForm, TuiHeader } from "@taiga-ui/layout";

import { LEECH_BUY_MIN_COUNT } from "../../../config";
import { LeechBuyForm } from "../../../model/form";

@Component({
  selector: "app-leech-buy-form-steps-leech",
  templateUrl: "leech.component.html",
  styleUrl: "leech.component.less",
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiForm,
    TuiHeader,
    TuiNotification,
    TuiRadioList,
    TuiTextfield,
    TuiTitle,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormStepsLeechComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly leechBuyMinCount = LEECH_BUY_MIN_COUNT;

  protected readonly packages = [
    {
      name: "Вода",
      description: "Транспортировка не более 1-х суток",
    },
    {
      name: "Гель",
      description: "Транспортировка не более 5 суток",
    },
    {
      name: "Торф",
      description: "Транспортировка не более 5 суток",
    },
  ];
}
