import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Product } from 'src/app/models/product.model';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { AddToCart } from 'src/app/core/store/cart/cart.actions';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: Product;

  isAdmin: boolean = false;
  isInCart: boolean;
  route: Router;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
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

    console.log(productToAdd);
    this.store.dispatch(new AddToCart(productToAdd));
    // this.router.navigate(['/products']);
  }
  ngOnInit() {}
}
