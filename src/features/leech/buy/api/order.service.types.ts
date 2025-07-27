export type PackageType = 0 | 1 | 2;

export interface CustomerInfo {
  fio: string;
  email: string;
  phone_number: string;
  address: string;
  comment?: string;
}

export interface OrderDetails {
  package_type: PackageType;
  leech_size_1?: number;
  leech_size_2?: number;
  leech_size_3?: number;
}

export interface CreateOrderRequest {
  customer_info: CustomerInfo;
  order_details: OrderDetails;
}

export interface Order {
  customer_info: CustomerInfo;
  order_details: OrderDetails;
  total_price: number;
}
