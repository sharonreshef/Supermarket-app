import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output()
  removeItem = new EventEmitter();
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
  remove() {
    this.removeItem.emit(this.product._id);
    this.checkIfIsInCart();
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
    console.log(localStorage.getItem('cartId'));
    if (localStorage.getItem('cartId') !== null) {
      this.cartServics.addItemToCart(cartId, this.product._id);
    } else {
      this.cartServics.createCart(this.product._id);
    }

    this.checkIfIsInCart();
  }

  checkIfIsInCart() {
    this.store
      .select<CartProductModel[]>(state => state.cart.products)
      .subscribe(products => {
        this.cart = products;
        if (this.cart.find(p => p.productId === this.product._id)) {
          this.isInCart = true;
        } else {
          this.isInCart = false;
        }
      });
  }

  ngOnInit() {
    this.subscribe$.push(
      this.store
        .select<CartProductModel[]>(state => state.cart.products)
        .subscribe(products => {
          this.cart = products;
          if (this.cart.find(p => p.productId === this.product._id)) {
            this.isInCart = true;
          } else {
            this.isInCart = false;
          }
        })
    );
  }
}
