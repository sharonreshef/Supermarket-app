import { CartProductModel } from '../../models/cart/cartProduct.model';

export interface CartState {
  readonly products: CartProductModel[];
  readonly dateCreated: Date;
}
