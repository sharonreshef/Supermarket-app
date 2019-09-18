import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  GetAllProducts,
  CreateProduct,
  EditProduct
} from '../store/product/product.actions';
// import CreateBookModel from "../models/book/create-book";
import { Router } from '@angular/router';
// import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import ProductModel from '../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly BASE_URL = `http://localhost:3000/products/`;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    // private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  getAllProducts() {
    this.http.get<ProductModel[]>(this.BASE_URL).subscribe(products => {
      this.store.dispatch(new GetAllProducts(products));
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

  editBook(productModel: ProductModel) {
    this.spinner.show();
    this.http
      .post(this.BASE_URL + `/${productModel._id}`, productModel)
      .subscribe(res => {
        this.store.dispatch(new EditProduct(res));
        this.spinner.hide();
        // this.router.navigate(['/']);
      });
  }

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
