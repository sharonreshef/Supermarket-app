import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  GetAllProducts,
  CreateProduct,
  EditProduct
} from '../store/product/product.actions';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService
  ) {}

  getAllProducts() {
    this.http.get<ProductModel[]>(this.BASE_URL).subscribe(products => {
      this.store.dispatch(new GetAllProducts(products));
    });
  }

  createProduct(product: ProductModel) {
    this.spinner.show();
    this.http.post(this.BASE_URL, product).subscribe(product => {
      this.store.dispatch(new CreateProduct(product));
      this.spinner.hide();
      this.router.navigate(['/products']);
    });
  }

  editProduct(product: ProductModel) {
    this.spinner.show();
    this.http.put(this.BASE_URL + `/${product._id}`, product).subscribe(res => {
      this.store.dispatch(new EditProduct(res));
      this.spinner.hide();
      this.router.navigate(['/products']);
    });
  }
}
