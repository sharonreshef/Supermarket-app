import { Component, OnInit, Output, DoCheck } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/core/store/app.state';
import { animations } from './product-list-animation';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/core/models/product/product.model';
import { ProductService } from 'src/app/product.service';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: animations
})
export class ProductListComponent implements OnInit {
  @Output()
  books: ProductModel[];

  subscribe$: Subscription[] = [];

  protected pageSize: number = 6;
  currentPage: number = 1;
  constructor(
    private spinner: NgxSpinnerService,
    private store: StoreService // private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.store.getProducts();

    // this.subscribe$.push(
    //   this.store
    //     .select<BookModel[]>(state => state.book.all)
    //     .subscribe(books => {
    //       this.books = books;
    //       this.spinner.hide();
    //     })
    // );
  }
}
