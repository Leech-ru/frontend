import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  tuiCrossFade,
  tuiSlideInTop,
  TuiTextfield,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiFloatingContainer, TuiStepper } from "@taiga-ui/kit";
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
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    ReactiveFormsModule,
    TuiAppBar,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiFloatingContainer,
    TuiHeader,
    TuiStepper,
    TuiTextfield,
    TuiTitle,
  ],
  host: {
    // Это нужно, чтобы при изменении размера экрана не было лишней анимации.
    "[@.disabled]": "breakpoint() !== 'mobile'",
  },
  animations: [tuiSlideInTop, tuiCrossFade],
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
    },
    {
      title: "Выбор упаковки",
      action: "Продолжить",
      state: () => this.packageStepState(),
      disabled: () => this.leechStepState() !== "pass",
      next: () => this.form.next(),
      back: () => this.form.previous(),
      backLabel: "Назад",
    },
    {
      title: "Контактная информация",
      action: "Оформить заказ",
      state: () => this.contactStepState(),
      disabled: () => this.packageStepState() !== "pass",
      next: () => this.form.submit(),
      back: () => this.form.previous(),
      backLabel: "Назад",
    },
  ];

  protected get step() {
    return this.steps[this.form.index()];
  }
}
