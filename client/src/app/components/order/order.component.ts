import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { CreditCardValidator, CreditCard } from 'angular-cc-library';
import { OrderModel } from 'src/app/core/models/order/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  private subscription$: Subscription[] = [];
  products: CartProductModel[];
  total: number;
  minDate = new Date();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      city: [null, [Validators.required]],
      street: [null, [Validators.required]],
      date: [null, [Validators.required]],
      creditCard: ['', [<any>CreditCardValidator.validateCCNumber]]
    });

    this.subscription$.push(
      this.store
        .pipe(select(state => state.cart.products))
        .subscribe(products => {
          this.products = products;
          this.calculateTotal();
        })
    );
  }

  fillUserCity() {
    const city = localStorage.getItem('city');
    this.orderForm.get('city').setValue(city);
  }

  fillUserStreet() {
    const street = localStorage.getItem('street');
    this.orderForm.get('street').setValue(street);
  }

  private calculateTotal() {
    this.total = 0;
    for (const p of this.products) {
      this.total += p.price * p.quantity;
    }
  }

  order() {
    // this.spinner.show();
    const { city, street, date, creditCard } = this.orderForm.value;
    const shippingDate = date.toISOString();
    this.orderForm.reset();

    const orderModel = new OrderModel(
      this.products,
      this.total,
      city,
      street,
      shippingDate,
      creditCard.substr(-4, 4)
    );

    this.orderService.order(orderModel);
    this.router.navigate(['/invoice']);
  }
}
