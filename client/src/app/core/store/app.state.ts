import { CartState } from './cart/cart.state';
import ProductState from './product/product.state';
import { OrderState } from './order/order.state';

export interface AppState {
  product: ProductState;
  cart: CartState;
  order: OrderState;
}
