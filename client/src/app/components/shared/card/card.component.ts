import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Product } from 'src/app/models/product.model';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { AddToCart } from 'src/app/core/store/cart/cart.actions';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsComponent } from 'src/app/products/products.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: Product;
  subscribe$: Subscription[] = [];

  isAdmin: boolean = false;
  isInCart: boolean = false;
  route: Router;
  cart: CartProductModel[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private cartServics: CartService
  ) {}

  ngDoCheck() {
    this.isAdmin = this.authService.getIsAdmin();
  }

  addToCart() {
    if (!this.authService.isAuth()) {
      this.router.navigate(['/']);
      return;
    }

    const productToAdd = new CartProductModel(
      this.product._id,
      this.product.name,
      this.product.image,
      this.product.price,
      1
    );

    const cartId = localStorage.getItem('cartId');
    console.log(cartId);
    this.cartServics.addItemToCart(cartId, this.product._id);

    console.log(productToAdd);
    this.isInCart = true;
    // this.store.dispatch(new AddToCart(productToAdd));
    // this.router.navigate(['/products']);
  }

  ngOnInit() {
    this.subscribe$.push(
      this.store
        .select<CartProductModel[]>(state => state.cart.products)
        .subscribe(products => {
          this.cart = products;
          if (this.cart.find(p => p.productId === this.product._id)) {
            this.isInCart = true;
          }
          console.log(this.isInCart);
        })
    );
  }
}
