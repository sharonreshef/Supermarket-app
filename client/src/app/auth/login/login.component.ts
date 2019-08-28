import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
