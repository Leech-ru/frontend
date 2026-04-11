import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "@/shared/api";
import { CreateOrderRequest, Order } from "./order.service.types";

@Injectable({ providedIn: "root" })
export class OrderService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/v1/order`;

  public create(body: CreateOrderRequest) {
    console.log("Сервис пиявок отправил запрос");
    return this.client.post<Order>(this.baseUrl, body);
  }
}
