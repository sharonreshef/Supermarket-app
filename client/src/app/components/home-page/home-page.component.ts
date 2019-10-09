import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isAuth: boolean = false;
  isAdmin: boolean = false;
  hasCart: boolean = false;
  numOfProducts: number;
  date: Date;
  products: CartProductModel[];
  private subscription$: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit() {
    this.productService.getAllProducts();
    this.numOfProducts = 0;
    this.subscription$.push(
      this.store
        .pipe(select(state => state.product.all))
        .subscribe(products => {
          this.numOfProducts = products.length;
        })
    );
  }
}
