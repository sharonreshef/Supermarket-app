import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  private subscription$: Subscription[] = [];
  hasCart: boolean = false;
  hasOrder: boolean = false;
  openCartDate;
  lastOrderDate;
  username: string;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.subscription$.push(
      this.store.pipe(select(state => state.cart)).subscribe(cart => {
        if (cart === null) {
          this.hasCart = false;
        }
        if (cart.products.length > 0) {
          this.hasCart = true;
          this.openCartDate = cart.dateCreated;
        }
      }),
      this.store.pipe(select(state => state.order.orders)).subscribe(orders => {
        if (orders === null) {
          this.hasOrder = false;
        }
        if (orders.length > 0) {
          this.hasOrder = true;
          this.lastOrderDate = orders[orders.length - 1].date;
          console.log(this.lastOrderDate);
        }
      })
    );
  }
}
