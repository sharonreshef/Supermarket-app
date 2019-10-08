import { cartReducer } from './cart/cart.reducers';
import { productReducer } from './product/product.reducers';
import { orderReducer } from './order/order.reducers';

export const appReducers = {
  product: productReducer,
  cart: cartReducer,
  order: orderReducer
};
