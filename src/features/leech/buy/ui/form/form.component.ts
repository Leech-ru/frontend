import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TuiAnimationPipe } from "@taiga-ui/cdk";
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  tuiCrossFade,
  tuiFadeIn,
  tuiFadeInBottom,
  tuiFadeInList,
  tuiHeightCollapse,
  tuiHeightCollapseList,
  tuiScaleIn,
  tuiSlideInTop,
  tuiSlideInTopList,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import {
  TuiElasticContainer,
  TuiFloatingContainer,
  TuiStepper,
} from "@taiga-ui/kit";
import { TuiAppBar, TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { LeechBuyForm } from "../../model/form";
import { TuiStepperStepState } from "../../model/types";
import { AppLeechBuyFormStepsContactComponent } from "../steps/contact/contact.component";
import { AppLeechBuyFormStepsLeechComponent } from "../steps/leech/leech.component";
import { AppLeechBuyFormStepsPackageComponent } from "../steps/package/package.component";

@Component({
  standalone: true,
  selector: "app-leech-buy-form",
  templateUrl: "form.component.html",
  styleUrl: "form.component.less",
  imports: [
    AppLeechBuyFormStepsContactComponent,
    AppLeechBuyFormStepsLeechComponent,
    AppLeechBuyFormStepsPackageComponent,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    ReactiveFormsModule,
    TuiAnimationPipe,
    TuiAppBar,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiElasticContainer,
    TuiFloatingContainer,
    TuiHeader,
    TuiStepper,
    TuiTextfield,
    TuiTitle,
  ],
  // host: {
  //   // Это нужно, чтобы при изменении размера экрана не было лишней анимации.
  //   "[@.disabled]": "breakpoint() !== 'mobile'",
  // },
  // // UPD: Оно убирает вообще все анимации.
  animations: [
    tuiSlideInTop,
    tuiHeightCollapse,
    tuiCrossFade,
    tuiScaleIn,
    tuiFadeInBottom,
    tuiHeightCollapseList,
    tuiFadeInList,
    tuiSlideInTopList,
    tuiFadeIn,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormComponent {
  protected readonly form = inject(LeechBuyForm);
  protected readonly router = inject(Router);
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService).pipe());

  protected readonly leechStepState = signal<TuiStepperStepState>("normal");
  protected readonly packageStepState = signal<TuiStepperStepState>("normal");
  protected readonly contactStepState = signal<TuiStepperStepState>("normal");

  protected readonly steps = [
    {
      title: "Выбор пиявок",
      action: "Продолжить",
      state: () => this.leechStepState(),
      next: () => this.form.next(),
      back: () => this.router.navigateByUrl(""),
      backLabel: "На главную",
      description: "Сроки доставки уточняйте у менеджера.",
    },
    {
      title: "Выбор упаковки",
      action: "Продолжить",
      state: () => this.packageStepState(),
      disabled: () => this.leechStepState() !== "pass",
      next: () => this.form.next(),
      back: () => this.form.previous(),
      backLabel: "Назад",
      description: "Стоимость упаковок уточняйте у менеджера.",
    },
    {
      title: "Контактная информация",
      action: "Оформить заказ",
      state: () => this.contactStepState(),
      disabled: () =>
        this.leechStepState() !== "pass" || this.packageStepState() !== "pass",
      next: () => this.form.submit(),
      back: () => this.form.previous(),
      backLabel: "Назад",
      description:
        "Подтверждение и уточнение заказа производится менеджером по телефону или электронной почте.",
    },
  ];

  protected get step() {
    return this.steps[this.form.index()];
  }
}
