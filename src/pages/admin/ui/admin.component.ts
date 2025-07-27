import { Component, inject, OnInit } from "@angular/core";

import { UserStore } from "@/entities/user";

@Component({
  selector: "app-admin",
  templateUrl: "admin.component.html",
  styleUrl: "admin.component.less",
})
export class AppAdminPageComponent implements OnInit {
  private readonly store = inject(UserStore);

  public ngOnInit() {
    this.store.load();
  }
}
