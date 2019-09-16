import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isAuth: boolean = false;
  numOfProducts: number;

  constructor(private authService: AuthService, private store: StoreService) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
  }

  ngOnInit() {
    this.store.getProducts();
    this.numOfProducts = this.store.currentState.numOfProducts;
  }
}
