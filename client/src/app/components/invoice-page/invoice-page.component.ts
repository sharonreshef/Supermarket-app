import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { OrderModel } from 'src/app/core/models/order/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent implements OnInit {
  private subscription$: Subscription[] = [];
  order: OrderModel;

  constructor(private store: Store<AppState>, private router: Router) {}
  backToShopping() {
    this.router.navigate(['/products']);
  }

  download() {
    var doc = new jsPDF();
    var col = ['product name', 'price', 'quantity', 'total price'];
    var rows = [];

    var itemNew = this.order;

    itemNew.products.forEach(element => {
      var temp = [
        element.name,
        element.price,
        element.quantity,
        element.quantity * element.price
      ];
      rows.push(temp);
    });
    rows.push(['GRAND TOTAL', '', '', itemNew.totalPrice]);
    doc.autoTable(col, rows);
    doc.save('Invoice.pdf');
  }

  ngOnInit() {
    this.subscription$.push(
      this.store
        .pipe(select(state => state.order.userOrders))
        .subscribe(orders => {
          this.order = orders[orders.length - 1];
        })
    );
  }
}
