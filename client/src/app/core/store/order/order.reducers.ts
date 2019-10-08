import { OrderState } from './order.state';
import { AppState } from '../app.state';
import {
  UPDATE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_USER_ORDERS,
  ADD_TO_ORDERS
} from './order.actions';
import { CartProductModel } from '../../models/cart/cartProduct.model';
import { CartModel } from '../../models/cart/cart.model';
import { OrderModel } from '../../models/order/order.model';

const initialState: OrderState = {
  orders: []
};

function getUserOrder(state: OrderState, orders: [OrderModel]) {
  return {
    ...state,
    orders: orders
  };
}

function addToOrders(state: OrderState, order: OrderModel) {
  return {
    ...state,
    orders: [...state.orders, order]
  };
}

export function orderReducer(state: OrderState = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return getUserOrder(state, action.payload);
    case ADD_TO_ORDERS:
      return addToOrders(state, action.payload);
    default:
      return state;
  }
}
