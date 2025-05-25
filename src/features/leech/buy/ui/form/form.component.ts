import { NgSwitch, NgSwitchCase } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiAppearance, TuiTextfield } from "@taiga-ui/core";
import { TuiStepper } from "@taiga-ui/kit";
import { TuiCardLarge } from "@taiga-ui/layout";

import { LeechBuyForm } from "../../model/form";
import { TuiStepperStepState } from "../../model/types";
import { AppLeechBuyFormStepsContactComponent } from "../steps/contact/contact.component";
import { AppLeechBuyFormStepsLeechComponent } from "../steps/leech/leech.component";
import { AppLeechBuyFormStepsPackageComponent } from "../steps/package/package.component";

@Component({
  selector: "app-leech-buy-form",
  templateUrl: "form.component.html",
  styleUrl: "form.component.less",
  imports: [
    AppLeechBuyFormStepsContactComponent,
    AppLeechBuyFormStepsLeechComponent,
    AppLeechBuyFormStepsPackageComponent,
    NgSwitch,
    NgSwitchCase,
    ReactiveFormsModule,
    TuiAppearance,
    TuiCardLarge,
    TuiStepper,
    TuiTextfield,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormComponent {
  protected readonly form = inject(LeechBuyForm);

  protected readonly leechStepState = signal<TuiStepperStepState>("normal");
  protected readonly packageStepState = signal<TuiStepperStepState>("normal");
  protected readonly contactStepState = signal<TuiStepperStepState>("normal");

  protected readonly steps = [
    { title: "Выбор пиявок", state: () => this.leechStepState() },
    {
      title: "Выбор упаковки",
      state: () => this.packageStepState(),
      disabled: () => this.leechStepState() !== "pass",
    },
    {
      title: "Контактная информация",
      state: () => this.contactStepState(),
      disabled: () => this.packageStepState() !== "pass",
    },
  ];
}
