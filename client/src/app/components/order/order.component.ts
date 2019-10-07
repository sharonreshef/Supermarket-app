import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { CreditCardValidator, CreditCard } from 'angular-cc-library';

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

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

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

  private calculateTotal() {
    this.total = 0;
    for (const p of this.products) {
      this.total += p.price * p.quantity;
    }
  }

  order() {
    // this.spinner.show();
    const { city, street, date, creditCard } = this.orderForm.value;

    this.orderForm.reset();
    console.log(
      this.products,
      this.total,
      city,
      street,
      date,
      creditCard.substr(-4, 4)
    );
    // console.log(CreditCardValidator.validateCCNumber(creditCard).ccNumber);

    // const loginModel = new LoginModel(username, password);
    // this.authService.login(loginModel);
    // this.orderForm.reset();
    // console.log(city, street, date, creditCard.substr(-4, 4));
    // console.log(CreditCardValidator.validateCCNumber(creditCard));
  }
}
