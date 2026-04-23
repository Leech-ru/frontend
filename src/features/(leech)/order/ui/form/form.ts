import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  TUI_BREAKPOINT,
  TuiAppearance,
  TuiButton,
  TuiFormatNumberPipe,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiStepper } from "@taiga-ui/kit";
import {
  TuiAppBar,
  TuiCardLarge,
  TuiElasticContainer,
  TuiHeader,
} from "@taiga-ui/layout";
import { FormStepper } from "../../lib";
import { LeechOrderForm } from "../../model/form";
import { AppLeechOrderFormStepsContactComponent } from "../steps/contact";
import { AppLeechOrderFormStepsFinishComponent } from "../steps/finish";
import { AppLeechOrderFormStepsLeechComponent } from "../steps/leech";
import { AppLeechOrderFormStepsPackageComponent } from "../steps/package";

@Component({
  selector: "app-leech-order-form",
  templateUrl: "form.html",
  styleUrl: "form.less",
  imports: [
    AppLeechOrderFormStepsContactComponent,
    AppLeechOrderFormStepsFinishComponent,
    AppLeechOrderFormStepsLeechComponent,
    AppLeechOrderFormStepsPackageComponent,
    NgTemplateOutlet,
    TuiAppBar,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiElasticContainer,
    TuiFormatNumberPipe,
    TuiHeader,
    TuiStepper,
    TuiTitle,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechOrderFormComponent {
  protected readonly form = inject(LeechOrderForm);
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly breakpoint = inject(TUI_BREAKPOINT);
  protected readonly stepper = new FormStepper([
    {
      title: $localize`Выбор пиявок`,
      description: $localize`Сроки доставки уточняйте у менеджера`,
      control: this.form.leech,
      back: () => this.router.navigateByUrl("/"),
    },
    {
      title: $localize`Выбор упаковки`,
      description: $localize`Стоимость упаковок уточняйте у менеджера`,
      control: this.form.package,
    },
    {
      title: $localize`Контактная информация`,
      description: $localize`Подтверждение и уточнение заказа производится менеджером по телефону или электронной почте`,
      control: this.form.contact,
      next: () => {
        this.form.submit();
        this.stepper.next();
      },
    },
    {
      title: $localize`Заказ успешно оформлен`,
      description: $localize`Обработка заказов осуществляется с понедельника по пятницу с 08:30 до 17:00.`,
      next: () => this.router.navigateByUrl("/"),
    },
  ]);

  public constructor() {
    if (this.form.submitted()) {
      this.form.reset();
    }

    this.route.queryParams.subscribe((params) => {
      const step = Number.parseInt(params["step"] as string) - 1;

      if (
        !isNaN(step) &&
        step >= 0 &&
        step < this.stepper.steps.length &&
        !this.stepper.steps[step].disabled
      ) {
        this.stepper.index.set(step);
      } else {
        const latestStep = this.stepper.steps
          .map((step, index) => ({ index, disabled: step.disabled }))
          .reverse()
          .find(({ disabled }) => !disabled);

        if (latestStep && latestStep.index > 0) {
          this.stepper.index.set(latestStep.index);
        }
      }
    });

    effect(() => {
      this.router.navigate([], {
        queryParams: { step: this.stepper.index() + 1 },
        queryParamsHandling: "merge",
        replaceUrl: this.route.snapshot.queryParams["step"] ? false : true,
      });
    });

    effect(() => {
      if (
        !this.form.submitted() &&
        this.stepper.index() === this.stepper.steps.length - 1
      ) {
        this.form.reset();
        this.stepper.index.set(0);
      }
    });
  }
}
