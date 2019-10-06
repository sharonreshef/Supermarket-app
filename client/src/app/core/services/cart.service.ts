import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  GetAllProducts,
  CreateProduct,
  EditProduct
} from '../store/product/product.actions';
import {
  GetUserCart,
  RemoveFromCart,
  ClearCart
} from '../store/cart/cart.actions';
import { Router } from '@angular/router';
// import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { CartModel } from '../models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly BASE_URL = `http://localhost:3000/carts/`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    // private toastr: ToastrService,
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
      .post<CartModel>(this.BASE_URL + `${cartId}`, itemToAdd)
      .subscribe(cart => {
        this.store.dispatch(new GetUserCart(cart));
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
      .put<CartModel>(this.BASE_URL + `${cartId}`, itemToAdd)
      .subscribe(cart => {
        this.store.dispatch(new GetUserCart(cart));
      });
  }

  clearCart() {
    const cartId = localStorage.getItem('cartId');
    this.http.delete<CartModel>(this.BASE_URL + `${cartId}`).subscribe(() => {
      this.store.dispatch(new ClearCart());
      localStorage.removeItem('cartId');
    });
  }

  // createBook(book: CreateBookModel) {
  //     this.spinner.show();
  //     this.http
  //         .post(this.BASE_URL + 'create', book)
  //         .subscribe((book) => {
  //             this.store.dispatch(new CreateBook(book))
  //             this.spinner.hide();
  //             this.router.navigate(['/book/all'])
  //             this.toastr.success('Product added successfully.')
  //         })
  // }

  //   editBook(productModel: ProductModel) {
  //     this.spinner.show();
  //     this.http
  //       .post(this.BASE_URL + `/${productModel._id}`, productModel)
  //       .subscribe(res => {
  //         this.store.dispatch(new EditProduct(res));
  //         this.spinner.hide();
  //         // this.router.navigate(['/']);
  //       });
  //   }

  removeItemFromCart(productId: string) {
    // this.spinner.show();
    const cartId = localStorage.getItem('cartId');
    this.http
      .delete<CartModel>(this.BASE_URL + `${cartId}/delete/${productId}`)
      .subscribe(cart => {
        this.store.dispatch(new RemoveFromCart(productId));
      });
  }
}
