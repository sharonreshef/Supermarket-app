import { CartState } from './cart/cart.state';
import ProductState from './product/product.state';

export interface AppState {
  product: ProductState;
  cart: CartState;
}
