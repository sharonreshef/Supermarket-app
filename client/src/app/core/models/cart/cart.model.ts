import { CartProductModel } from '../cart/cartProduct.model';

export class CartModel {
  _id: string;
  costumerID: string;
  products: CartProductModel[];
  dateCreated: Date;
}
