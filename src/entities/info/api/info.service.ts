import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { CorporationInfo, UpdateInfoRequest } from "@/entities/info";

@Injectable({ providedIn: "root" })
export class InfoService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/info/corporation`;

  public get() {
    return this.client.get<CorporationInfo>(this.baseUrl);
  }

  public update(body: UpdateInfoRequest) {
    return this.client.patch<CorporationInfo>(this.baseUrl, body, {
      withCredentials: true,
    });
  }
}
