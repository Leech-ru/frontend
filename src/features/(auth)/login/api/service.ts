import { AuthService } from "@/entities/auth";
import { USER_RESOURCE, UserLoginRequest, UserService } from "@/entities/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoginService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly userResource = inject(USER_RESOURCE);

  public async login(body: UserLoginRequest) {
    const user = await lastValueFrom(this.userService.login(body));
    this.userResource.set(user);
    await lastValueFrom(this.authService.refresh());
    this.router.navigateByUrl("/");
  }
}
