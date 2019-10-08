import { Component, OnInit, Output, DoCheck } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/core/services/product.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { animations } from './product-list-animation';
import { Subscription } from 'rxjs';
import ProductModel from 'src/app/core/models/product/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: animations
})
export class ProductListComponent implements OnInit {
  @Output()
  products: ProductModel[];
  filteredProducts: ProductModel[];

  subscribe$: Subscription[] = [];

  protected pageSize: number = 6;
  currentPage: number = 1;
  constructor(
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private store: Store<AppState>,

    private cartService: CartService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.productService.getAllProducts();
    this.cartService.getUserCart();
    this.subscribe$.push(
      this.store
        .select<ProductModel[]>(state => state.product.all)
        .subscribe(products => {
          console.log('PRODUCTS', products);
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
    console.log(this.filteredProducts);
  }

  changePage(page) {
    this.currentPage = page;
  }
  removeFromCart(productId: string) {
    this.cartService.removeItemFromCart(productId);
  }

  ngOnDestroy(): void {
    this.subscribe$.forEach(sub => sub.unsubscribe());
  }
}
