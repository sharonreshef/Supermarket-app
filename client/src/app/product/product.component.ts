import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  get link(): string {
    return `/product/${this.product._id}`;
  }

  ngOnInit() {}
}
