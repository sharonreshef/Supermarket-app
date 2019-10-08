import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order/order.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { ClearCart } from '../store/cart/cart.actions';
import { CartService } from './cart.service';
import { GetUserOrders, AddToOrders } from '../store/order/order.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {}

  order(body: OrderModel) {
    this.http
      .post<OrderModel>('http://localhost:3000/order', body)
      .subscribe(order => {
        this.store.dispatch(new AddToOrders(order));
        this.cartService.clearCart();
      });
  }

  getUserOrders() {
    this.http
      .get<[OrderModel]>('http://localhost:3000/order/myorders')
      .subscribe(async orders => {
        await this.store.dispatch(new GetUserOrders(orders));
      });
  }
}
