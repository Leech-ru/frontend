import { USER_RESOURCE, UserService } from "@/entities/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class LogoutService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly userResource = inject(USER_RESOURCE);

  public async logout() {
    await lastValueFrom(this.userService.logout());
    this.userResource.set(null);
    this.router.navigateByUrl("/login");
  }
}
