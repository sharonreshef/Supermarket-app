import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(public store: StoreService) {}

  ngOnInit() {
    this.store.getProducts();
    this.store.getCategories();
  }
}
