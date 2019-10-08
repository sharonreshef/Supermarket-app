import { OrderModel } from '../../models/order/order.model';

export interface OrderState {
  readonly orders: OrderModel[];
}
