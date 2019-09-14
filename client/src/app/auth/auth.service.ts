import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { LoginData } from './login-data.model';
import { Router } from '@angular/router';
import { LoginModel } from '../core/models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    // private tostr: ToastrService,
    private router: Router
  ) {}

  createUser(
    email: string,
    password: string,
    customerID: number,
    city: string,
    street: string,
    firstName: string,
    lastName: string
  ) {
    const authData: AuthData = {
      email: email,
      password: password,
      customerID: customerID,
      city: city,
      street: street,
      firstName: firstName,
      lastName: lastName
    };
    this.http
      .post('http://localhost:3000/customers', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(body: LoginModel) {
    this.http.post('http://localhost:3000/auth', body).subscribe(response => {
      console.log(response);
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  isAuth() {
    return !!localStorage.getItem('token');
  }

  getIsAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout() {
    localStorage.clear();
    // this.tostr.success('You ware logged out!');
    this.router.navigate(['']);
  }
}
