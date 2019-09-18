import { cartReducer } from './cart/cart.reducers';
import { productReducer } from './product/product.reducers';

export const appReducers = {
  product: productReducer,
  cart: cartReducer
};
