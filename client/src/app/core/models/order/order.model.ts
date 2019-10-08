import { CartProductModel } from '../cart/cartProduct.model';

export class OrderModel {
  constructor(
    public products: CartProductModel[],
    public totalPrice: number,
    public city: string,
    public street: string,
    public shippingDate: Date,
    public last4CreditDigit: number,
    public date?: Date
  ) {}
}
