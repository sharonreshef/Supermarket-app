import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import ProductModel from 'src/app/core/models/product/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  private subscription$: Subscription[] = [];

  isAuth: boolean = false;
  isAdmin: boolean = false;
  opened: boolean;
  numOfItems: number;
  products: ProductModel[];
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit() {
    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          this.numOfItems = products.length;
        })
    );
  }
}
