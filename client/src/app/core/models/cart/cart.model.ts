export class CartProductModel {
  constructor(
    public _id: string,
    public anme: string,
    public image: string,
    public price: number,
    public quantity: number
  ) {}
}
