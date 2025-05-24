import { NgSwitch, NgSwitchCase } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiTextfield } from "@taiga-ui/core";

import { LeechBuyForm } from "../../model/form";
import { AppLeechBuyFormStepsContactComponent } from "../steps/contact/contact.component";
import { AppLeechBuyFormStepsLeechComponent } from "../steps/leech/leech.component";

@Component({
  selector: "app-leech-buy-form",
  templateUrl: "form.component.html",
  styleUrl: "form.component.less",
  imports: [
    AppLeechBuyFormStepsContactComponent,
    AppLeechBuyFormStepsLeechComponent,
    NgSwitch,
    NgSwitchCase,
    ReactiveFormsModule,
    TuiTextfield,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechBuyFormComponent {
  protected readonly form = inject(LeechBuyForm);
}
