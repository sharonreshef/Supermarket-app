import { Component, OnInit } from '@angular/core';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { UpdateCart } from 'src/app/core/store/cart/cart.actions';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';
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
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.total = 0;
    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          this.products = products;
          this.calculateTotal();
        })
    );
  }

  private calculateTotal() {
    this.total = 0;
    for (const p of this.products) {
      this.total += p.price * p.quantity;
    }
  }

  removeFromCart(productId: string) {
    this.cartService.removeItemFromCart(productId);
  }

  updateQuantity(quantityObj) {
    const { id, newQuantity } = quantityObj;
    this.cartService.updateCart(id, newQuantity);
  }

  clear() {
    this.cartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/order']);
  }

  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
