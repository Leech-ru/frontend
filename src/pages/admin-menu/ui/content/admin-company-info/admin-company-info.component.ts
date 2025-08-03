import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { tuiArrayRemove } from "@taiga-ui/cdk";
import {
  TuiAppearance,
  TuiButton,
  TuiGroup,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldOptionsDirective,
} from "@taiga-ui/core";
import { TuiElasticContainer } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

@Component({
  selector: "app-admin-menu-company-info",
  imports: [
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiElasticContainer,
    TuiCardLarge,
    TuiHeader,
    TuiLabel,
    TuiAppearance,
    TuiTextfieldOptionsDirective,
    TuiButton,
    FormsModule,
    TuiGroup,
    TuiIcon,
  ],
  templateUrl: "admin-company-info.component.html",
  styleUrl: "admin-company-info.component.less",
})
export class AdminCompanyInfoComponent {
  protected readonly isEditingMode = signal(false);
  protected phoneItems: string[] = [];

  protected addPhone() {
    this.phoneItems.push("");
  }

  protected deletePhone(index: number) {
    this.phoneItems = tuiArrayRemove(this.phoneItems, index);
  }
}
