import {
  USER_RESOURCE,
  UserRegisterRequest,
  UserService,
} from "@/entities/user";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class RegisterService {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly userResource = inject(USER_RESOURCE);

  public async register(body: UserRegisterRequest) {
    const user = await lastValueFrom(this.userService.register(body));
    this.userResource.set(user);
    this.router.navigateByUrl("/");
  }
}
