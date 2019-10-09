import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  GetUserCart,
  RemoveFromCart,
  ClearCart,
  AddToCart,
  UpdateCart
} from '../store/cart/cart.actions';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { CartModel } from '../models/cart/cart.model';
import { CartProductModel } from '../models/cart/cartProduct.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly BASE_URL = `http://localhost:3000/carts/`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  getUserCartFromStorage() {
    return localStorage.getItem('cartId');
  }

  getUserCart() {
    this.http.get<CartModel>(this.BASE_URL).subscribe(async cart => {
      if (cart === null) {
        return false;
      } else {
        await this.store.dispatch(new GetUserCart(cart));
        await localStorage.setItem('cartId', cart._id);
      }
    });
  }

  createCart(productId) {
    this.http.post<CartModel>(this.BASE_URL, null).subscribe(cart => {
      localStorage.setItem('cartId', cart._id);
      const cartId = localStorage.getItem('cartId');
      this.addItemToCart(cartId, productId);
      this.store.dispatch(new GetUserCart(cart));
    });
  }

  addItemToCart(cartId, productId) {
    const itemToAdd = {
      productId: productId,
      quantity: 1
    };
    this.http
      .post<CartProductModel>(this.BASE_URL + `${cartId}`, itemToAdd)
      .subscribe(itemToAdd => {
        this.store.dispatch(new AddToCart(itemToAdd));
      });
  }

  updateCart(id: string, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    // debugger
    const itemToAdd = {
      productId: id,
      quantity: quantity
    };
    this.http
      .put<number>(this.BASE_URL + `${cartId}`, itemToAdd)
      .subscribe(newQuantity => {
        this.store.dispatch(new UpdateCart(id, newQuantity));
      });
  }

  clearCart() {
    const cartId = localStorage.getItem('cartId');
    this.http.delete<CartModel>(this.BASE_URL + `${cartId}`).subscribe(() => {
      this.store.dispatch(new ClearCart());
      localStorage.removeItem('cartId');
    });
  }

  removeItemFromCart(productId: string) {
    const cartId = localStorage.getItem('cartId');
    this.http
      .delete<CartModel>(this.BASE_URL + `${cartId}/delete/${productId}`)
      .subscribe(cart => {
        this.store.dispatch(new RemoveFromCart(productId));
      });
  }
}
