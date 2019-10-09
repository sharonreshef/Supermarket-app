import { OrderState } from './order.state';
import { AppState } from '../app.state';
import {
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_USER_ORDERS,
  ADD_TO_ORDERS,
  UPDATE_ORDERS_NUM
} from './order.actions';
import { CartProductModel } from '../../models/cart/cartProduct.model';
import { CartModel } from '../../models/cart/cart.model';
import { OrderModel } from '../../models/order/order.model';

const initialState: OrderState = {
  numOfOrders: null,
  userOrders: []
};

function getUserOrder(state: OrderState, orders: [OrderModel]) {
  return {
    ...state,
    userOrders: orders
  };
}

function updateOrdersNum(state: OrderState, num: number) {
  console.log(num);
  return {
    ...state,
    numOfOrders: num
  };
}

function addToOrders(state: OrderState, order: OrderModel) {
  return {
    ...state,
    userOrders: [...state.userOrders, order],
    numOfOrders: state.numOfOrders + 1
  };
}

export function orderReducer(state: OrderState = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return getUserOrder(state, action.payload);
    case ADD_TO_ORDERS:
      return addToOrders(state, action.payload);
    case UPDATE_ORDERS_NUM:
      return updateOrdersNum(state, action.num);
    default:
      return state;
  }
}
