import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  isAuth: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.getIsAdmin();
  }

  ngOnInit() {}
}
