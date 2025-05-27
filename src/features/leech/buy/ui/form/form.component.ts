import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { TuiCurrency, tuiFormatCurrency } from "@taiga-ui/addon-commerce";
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  tuiFormatNumber,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiElasticContainer, TuiStepper } from "@taiga-ui/kit";
import { TuiAppBar, TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { FormStepper } from "@/shared/lib/forms";

import { LeechBuyForm } from "../../model/form";
import { AppLeechBuyFormStepsContactComponent } from "../steps/contact/contact.component";
import { AppLeechBuyFormStepsFinishComponent } from "../steps/finish/finish.component";
import { AppLeechBuyFormStepsLeechComponent } from "../steps/leech/leech.component";
import { AppLeechBuyFormStepsPackageComponent } from "../steps/package/package.component";

@Component({
  standalone: true,
  selector: "app-leech-buy-form",
  templateUrl: "form.component.html",
  styleUrl: "form.component.less",
  imports: [
    AppLeechBuyFormStepsContactComponent,
    AppLeechBuyFormStepsFinishComponent,
    AppLeechBuyFormStepsLeechComponent,
    AppLeechBuyFormStepsPackageComponent,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    TuiAppBar,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiElasticContainer,
    TuiHeader,
    TuiStepper,
    TuiTitle,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly router = inject(Router);
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService).pipe());

  protected readonly stepper = new FormStepper([
    {
      title: "Выбор пиявок",
      description: "Сроки доставки уточняйте у менеджера",
      control: this.form.leech,
      backLabel: "Назад",
      nextLabel: "Далее",
      back: () => this.router.navigateByUrl("/"),
    },
    {
      title: "Выбор упаковки",
      description: "Стоимость упаковок уточняйте у менеджера",
      control: this.form.package,
      backLabel: "Назад",
      nextLabel: "Далее",
    },
    {
      title: "Контактная информация",
      description:
        "Подтверждение и уточнение заказа производится менеджером по телефону или электронной почте",
      control: this.form.contact,
      backLabel: "Назад",
      nextLabel: () =>
        `Оформить заказ на ${tuiFormatNumber(this.form.price)} ${tuiFormatCurrency(TuiCurrency.Ruble)}`,
      next: () => {
        this.form.submit();
        this.stepper.next();
      },
    },
    {
      title: "Заказ успешно оформлен",
      description:
        "Обработка заказов осуществляется с понедельника по пятницу с 08:30 до 17:00.",
      backLabel: "Назад",
      nextLabel: "Вернуться на главную",
      next: () => this.router.navigateByUrl("/"),
    },
  ]);

  protected constructor() {
    this.form.group.reset();
  }
}
