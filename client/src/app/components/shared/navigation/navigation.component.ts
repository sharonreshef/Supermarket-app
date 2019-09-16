import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  username: string;
  isAuth: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngDoCheck() {
    this.username = this.authService.getUsername();
    this.isAuth = this.authService.isAuth();
    this.isAdmin = this.authService.getIsAdmin();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {}
}
