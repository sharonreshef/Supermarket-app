import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  GetAllProducts,
  CreateProduct,
  EditProduct
} from '../store/product/product.actions';
import { GetUserCart } from '../store/cart/cart.actions';
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

  getUserCart() {
    this.http.get<CartModel>(this.BASE_URL).subscribe(cart => {
      this.store.dispatch(new GetUserCart(cart));
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

  // deleteBook(book: BookModel, activeModal) {
  //     this.spinner.show();
  //     this.http
  //         .delete(this.BASE_URL + `delete/${book._id}`)
  //         .subscribe(() => {
  //             this.store.dispatch(new DeleteBook(book));
  //             this.spinner.hide();
  //             activeModal.close();
  //             this.router.navigate(['/book/all']);
  //         })
  // }
}
