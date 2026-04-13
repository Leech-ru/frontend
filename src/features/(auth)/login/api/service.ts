import {
  CURRENT_USER_RESOURCE,
  UserLoginRequest,
  UserService,
} from "@/entities/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class LoginService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly currentUserResource = inject(CURRENT_USER_RESOURCE);

  public async login(body: UserLoginRequest) {
    const user = await lastValueFrom(this.userService.login(body));
    this.currentUserResource.set(user);
    this.router.navigateByUrl("/");
  }
}
