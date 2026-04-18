import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TuiCurrency, tuiFormatCurrency } from "@taiga-ui/addon-commerce";
import {
  TUI_BREAKPOINT,
  TuiAppearance,
  TuiButton,
  tuiFormatNumber,
  TuiTitle,
} from "@taiga-ui/core";
import { TuiStepper } from "@taiga-ui/kit";
import {
  TuiAppBar,
  TuiCardLarge,
  TuiElasticContainer,
  TuiHeader,
} from "@taiga-ui/layout";
import { CreateOrderRequest, PackageType } from "../../api/types";
import { LEECH_ORDER_MIN_COUNT } from "../../config";
import { FormStepper } from "../../lib";
import { LeechOrderForm } from "../../model/form";
import { AppLeechOrderFormStepsContactComponent } from "../steps/contact";
import { AppLeechOrderFormStepsFinishComponent } from "../steps/finish";
import { AppLeechOrderFormStepsLeechComponent } from "../steps/leech";
import { AppLeechOrderFormStepsPackageComponent } from "../steps/package";

const NEED_PLURAR_RULES_RU: Record<Intl.LDMLPluralRule, string> = {
  zero: "Необходима",
  one: "Необходима",
  two: "Необходимо",
  few: "Необходимо",
  many: "Необходимо",
  other: "Необходимо",
};

const LEECH_PLURAR_RULES_RU: Record<Intl.LDMLPluralRule, string> = {
  zero: "пиявок",
  one: "пиявка",
  two: "пиявки",
  few: "пиявки",
  many: "пиявок",
  other: "пиявок",
};

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
  protected readonly plurarRulesRu = new Intl.PluralRules("ru");
  protected readonly stepper = new FormStepper([
    {
      title: "Выбор пиявок",
      description: "Сроки доставки уточняйте у менеджера",
      control: this.form.leech,
      backLabel: "Назад",
      nextLabel: () => {
        const remains = LEECH_ORDER_MIN_COUNT - this.form.count;
        const remainsLDMLPluralRule = this.plurarRulesRu.select(remains);
        const remainsNeedWord = NEED_PLURAR_RULES_RU[remainsLDMLPluralRule];
        const remainsLeechWord = LEECH_PLURAR_RULES_RU[remainsLDMLPluralRule];

        return this.form.count < LEECH_ORDER_MIN_COUNT
          ? `${remainsNeedWord} ещё ${remains} ${remainsLeechWord}`
          : "Далее";
      },
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
      if (this.form.submitted()) {
        this.createOrder();
      }
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

  private createOrder() {
    const data: CreateOrderRequest = {
      customer_info: {
        fio: this.form.contact.get("name")?.value || "",
        address: this.form.contact.get("address")?.value || "",
        comment: this.form.contact.get("comment")?.value || undefined,
        email: this.form.contact.get("email")?.value || "",
        phone_number: this.form.contact.get("phone")?.value || "",
      },
      order_details: {
        leech_size_1: this.form.leech.get("small")?.value || 0,
        leech_size_2: this.form.leech.get("medium")?.value || 0,
        leech_size_3: this.form.leech.get("large")?.value || 0,
        package_type: this.form.group.get("package")
          ?.value as unknown as PackageType,
      },
    };
  }
}
