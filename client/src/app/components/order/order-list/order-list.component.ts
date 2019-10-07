import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private subscription$: Subscription[] = [];
  products: CartProductModel[];
  total: number;

  constructor(private store: Store<AppState>) {}

  private calculateTotal() {
    this.total = 0;
    for (const p of this.products) {
      this.total += p.price * p.quantity;
    }
  }

  ngOnInit() {
    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          this.products = products;
          this.calculateTotal();
        })
    );
  }
}
