import { Component, OnInit } from '@angular/core';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { UpdateCart } from 'src/app/core/store/cart/cart.actions';
import { CartService } from 'src/app/core/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: CartProductModel[];
  total: number;
  private subscription$: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private cartService: CartService // private chekoutService:CheckoutService,
  ) {}

  ngOnInit() {
    this.total = 0;
    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          this.products = products;
        })
    );
    console.log('ngoninit cart componente', this.products);
    this.calculateTotal();
  }

  private calculateTotal() {
    console.log('ngoninit');
    for (const p of this.products) {
      this.total += p.price * p.quantity;
    }
    console.log(this.total);
  }

  // removeFromCart(id: string) {
  //   this.store.dispatch(new RemoveFromCart(id));
  //   this.calculateTotal();
  // }

  updateQuantity(quantityObj) {
    const { id, newQuantity } = quantityObj;

    if (!isNaN(newQuantity) && parseInt(newQuantity, 10) >= 1) {
      // debugger
      // this.store.dispatch(new UpdateCart(id, newQuantity));
      this.cartService.updateCart(id, newQuantity);
    } else {
      this.store.dispatch(new UpdateCart(id, 1));
    }

    this.calculateTotal();
  }

  // checkout(){
  //   // let checkout=new CheckoutModel(this.books);
  //     this.chekoutService.checkout(this.books);
  // }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
