import { CartProductModel } from '../../models/cart/cart.model';

export interface CartState {
  readonly products: CartProductModel[];
}
