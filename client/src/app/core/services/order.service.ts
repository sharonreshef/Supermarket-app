import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderModel } from '../models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private router: Router) {}

  order(body: OrderModel) {
    this.http.post('http://localhost:3000/order', body).subscribe(response => {
      console.log(response);
    });
  }
}
