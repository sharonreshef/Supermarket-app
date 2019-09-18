import { Action } from '@ngrx/store';
import { CartProductModel } from '../../models/cart/cart.model';

export const ADD_TO_CART = '[CART] ADD';
export const UPDATE_CART = '[CART] UPDATE CART';
export const REMOVE_FROM_CART = '[CART] REMOVE';
export const CLEAR_CART = '[CART] CLEAR';

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
