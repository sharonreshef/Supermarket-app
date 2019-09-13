import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngDoCheck() {
    this.isAuth = this.authService.isAuth();
  }

  ngOnInit() {}
}
