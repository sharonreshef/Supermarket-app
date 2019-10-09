export class CartProductModel {
  constructor(
    public name: string,
    public productId: string,
    public image: string,
    public price: number,
    public quantity: number
  ) {}
}
