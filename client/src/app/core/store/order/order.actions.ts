import { Action } from '@ngrx/store';
import { CartProductModel } from '../../models/cart/cartProduct.model';
import { CartModel } from '../../models/cart/cart.model';
import { OrderModel } from '../../models/order/order.model';

export const GET_USER_ORDERS = '[ORDER] GET';
export const ADD_TO_ORDERS = '[ORDER] ADD';
export const UPDATE_ORDERS_NUM = '[ORDER] UPDATE ORDERS NUM';
export const REMOVE_FROM_CART = '[CART] REMOVE';
export const CLEAR_CART = '[CART] CLEAR';

export class GetUserOrders implements Action {
  readonly type: string = GET_USER_ORDERS;
  constructor(public payload: [OrderModel]) {}
}

export class AddToOrders implements Action {
  readonly type: string = ADD_TO_ORDERS;

  constructor(public payload: OrderModel) {}
}

export class UpdateOrdersNum implements Action {
  readonly type: string = UPDATE_ORDERS_NUM;

  constructor(public num: number) {}
}

export class RemoveFromCart implements Action {
  readonly type: string = REMOVE_FROM_CART;

  constructor(public id: string) {}
}

export class ClearCart implements Action {
  readonly type: string = CLEAR_CART;
}
