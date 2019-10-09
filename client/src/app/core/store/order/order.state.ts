import { OrderModel } from '../../models/order/order.model';

export interface OrderState {
  readonly numOfOrders: number;
  readonly userOrders: OrderModel[];
}
