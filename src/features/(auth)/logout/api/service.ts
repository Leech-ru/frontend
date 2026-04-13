import { CURRENT_USER_RESOURCE, UserService } from "@/entities/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class LogoutService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly currentUserResource = inject(CURRENT_USER_RESOURCE);

  public async logout() {
    await lastValueFrom(this.userService.logout());
    this.currentUserResource.set(null);
    this.router.navigateByUrl("/login");
  }
}
