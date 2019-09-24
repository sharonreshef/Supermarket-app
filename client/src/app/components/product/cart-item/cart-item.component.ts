import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input()
  product: CartProductModel;

  @Output()
  removeItem = new EventEmitter();

  @Output()
  amount = new EventEmitter();

  productTotal: number;

  constructor() {}

  remove() {
    this.removeItem.emit(this.product.productId);
  }

  setQuantity(event, id) {
    const newQuantity = event.target.value;
    this.amount.emit({ newQuantity, id });
    this.calculateSubTotal(newQuantity);
  }

  ngOnInit() {
    this.calculateSubTotal(this.product.amount);
  }

  private calculateSubTotal(newQuantity) {
    this.productTotal = this.product.price * newQuantity;
    console.log(this.productTotal);
  }
}
