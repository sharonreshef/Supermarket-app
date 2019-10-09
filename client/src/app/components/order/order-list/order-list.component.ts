import { Component, OnInit, Input } from '@angular/core';
import { CartProductModel } from 'src/app/core/models/cart/cartProduct.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  total: number;

  @Input() products: CartProductModel[];
  backToShopping() {
    this.router.navigate(['/products']);
  }

  constructor(private router: Router) {}

  ngOnInit() {}
}
