import { NgComponentOutlet, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { submit } from "@angular/forms/signals";
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
import { LeechOrderForm } from "../../model/form";
import { AppLeechOrderFormStepsContactComponent } from "../steps/contact";
import { AppLeechOrderFormStepsFinishComponent } from "../steps/finish";
import { AppLeechOrderFormStepsLeechComponent } from "../steps/leech";
import { AppLeechOrderFormStepsPackageComponent } from "../steps/package";

@Component({
  selector: "app-leech-order-form",
  templateUrl: "form.html",
  styleUrl: "form.less",
  providers: [LeechOrderForm],
  imports: [
    NgComponentOutlet,
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
  protected readonly index = signal(0);

  protected readonly steps = [
    {
      title: $localize`Выбор пиявок`,
      description: $localize`Сроки доставки уточняйте у менеджера`,
      control: this.form.form.leech,
      back: () => {
        this.router.navigateByUrl("/");
      },
      next: () => {
        this.index.update((index) => index + 1);
      },
      component: AppLeechOrderFormStepsLeechComponent,
    },
    {
      title: $localize`Выбор упаковки`,
      description: $localize`Стоимость упаковок уточняйте у менеджера`,
      control: this.form.form.package,
      back: () => {
        this.index.update((index) => index - 1);
      },
      next: () => {
        this.index.update((index) => index + 1);
      },
      component: AppLeechOrderFormStepsPackageComponent,
    },
    {
      title: $localize`Контактная информация`,
      description: $localize`Подтверждение и уточнение заказа производится менеджером по телефону или электронной почте`,
      control: this.form.form.contact,
      back: () => {
        this.index.update((index) => index - 1);
      },
      next: () => {
        submit(this.form.form);
        this.index.update((index) => index + 1);
      },
      component: AppLeechOrderFormStepsContactComponent,
    },
    {
      title: $localize`Заказ успешно оформлен`,
      description: $localize`Обработка заказов осуществляется с понедельника по пятницу с 08:30 до 17:00.`,
      back: () => {
        this.index.update((index) => index - 1);
      },
      next: () => {
        this.router.navigateByUrl("/");
      },
      component: AppLeechOrderFormStepsFinishComponent,
    },
  ].map((step, i, all) => ({
    ...step,
    disabled: computed(() =>
      all
        .slice(0, i)
        .map((s) => s.control)
        .some((c) => c?.().invalid()),
    ),
    state: computed(() =>
      step.control?.().touched()
        ? step.control?.().invalid()
          ? "error"
          : "pass"
        : "normal",
    ),
  }));

  public constructor() {
    this.route.queryParams.subscribe((params) => {
      const step = Number.parseInt(params["step"] as string) - 1;

      if (
        !isNaN(step) &&
        step >= 0 &&
        step < this.steps.length &&
        !this.steps[step].disabled()
      ) {
        this.index.set(step);
      } else {
        const latestStep = this.steps
          .map((step, index) => ({ index, disabled: step.disabled }))
          .reverse()
          .find(({ disabled }) => !disabled());

        if (latestStep && latestStep.index > 0) {
          this.index.set(latestStep.index);
        }
      }
    });

    effect(() => {
      this.router.navigate([], {
        queryParams: { step: this.index() + 1 },
        queryParamsHandling: "merge",
        replaceUrl: this.route.snapshot.queryParams["step"] ? false : true,
      });
    });
  }
}
