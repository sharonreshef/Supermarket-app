import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-shopping',
  templateUrl: './start-shopping.component.html',
  styleUrls: ['./start-shopping.component.scss']
})
export class StartShoppingComponent implements OnInit {
  private subscription$: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  hasCart: boolean;

  ngOnInit() {
    this.cartService.getUserCart();
    this.hasCart = false;
    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          if (products.length > 0) {
            this.hasCart = true;
          } else {
            this.hasCart = false;
          }
        })
    );
  }
}
