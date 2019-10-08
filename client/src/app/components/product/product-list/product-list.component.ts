import { Component, OnInit, Output, DoCheck } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/core/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { animations } from './product-list-animation';
import { Subscription } from 'rxjs';
import ProductModel from 'src/app/core/models/product/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: animations
})
export class ProductListComponent implements OnInit {
  @Output()
  products: ProductModel[] = [];
  filteredProducts: ProductModel[];
  subscribe$: Subscription[] = [];
  category: string;

  protected pageSize: number = 6;
  currentPage: number = 1;
  constructor(
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private store: Store<AppState>,
    private cartService: CartService,
    route: ActivatedRoute
  ) {
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = this.category
        ? this.products.filter(p => p.categoryName === this.category)
        : this.products;
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.productService.getAllProducts();
    this.subscribe$.push(
      this.store
        .select<ProductModel[]>(state => state.product.all)
        .subscribe(products => {
          this.filteredProducts = this.products = products;
          this.spinner.hide();
        })
    );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  changePage(page) {
    this.currentPage = page;
  }
  removeFromCart(productId: string) {
    this.cartService.removeItemFromCart(productId);
  }

  updateQuantity(quantityObj) {
    const { id, newQuantity } = quantityObj;
    this.cartService.updateCart(id, newQuantity);
  }

  ngOnDestroy(): void {
    this.subscribe$.forEach(sub => sub.unsubscribe());
  }
}
