import { Action } from '@ngrx/store';
import { CartProductModel } from '../../models/cart/cartProduct.model';
import { CartModel } from '../../models/cart/cart.model';

export const GET_USER_CART = '[CART] GET';
export const ADD_TO_CART = '[CART] ADD';
export const UPDATE_CART = '[CART] UPDATE CART';
export const REMOVE_FROM_CART = '[CART] REMOVE';
export const CLEAR_CART = '[CART] CLEAR';

export class GetUserCart implements Action {
  readonly type: string = GET_USER_CART;
  constructor(public payload: CartModel) {}
}

export class AddToCart implements Action {
  readonly type: string = ADD_TO_CART;

  constructor(public payload: CartProductModel) {}
}

export class UpdateCart implements Action {
  readonly type: string = UPDATE_CART;

  constructor(public id: string, public quantity: number) {}
}

export class RemoveFromCart implements Action {
  readonly type: string = REMOVE_FROM_CART;

  constructor(public id: string) {}
}

export class ClearCart implements Action {
  readonly type: string = CLEAR_CART;
}
