import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { CreateOrderRequest, Order } from "@/features/leech/buy";

@Injectable({ providedIn: "root" })
export class OrderService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/order`;

  public create(body: CreateOrderRequest) {
    return this.client.post<Order>(this.baseUrl, body);
  }
}
