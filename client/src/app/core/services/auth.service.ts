import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/auth/register.model';
import { LoginModel } from '../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    // private tostr: ToastrService,
    private router: Router
  ) {}

  // isIDUniqe;

  // checkID(customerID: string) {
  //   const body = {
  //     customerID: customerID
  //   };
  //   this.http
  //     .post('http://localhost:3000/customers/checkID', body)
  //     .subscribe(response => {
  //       if(response.status === 200)
  //     });
  // }
  // getUniqe() {
  //   console.log(this.isIDUniqe);
  //   return this.isIDUniqe;
  // }

  createUser(
    email: string,
    password: string,
    customerID: number,
    city: string,
    street: string,
    firstName: string,
    lastName: string
  ) {
    const body: RegisterModel = {
      email: email,
      password: password,
      customerID: customerID,
      city: city,
      street: street,
      firstName: firstName,
      lastName: lastName
    };
    this.http
      .post('http://localhost:3000/customers', body)
      .subscribe(response => {
        this.router.navigate(['']);
      });
  }

  login(body: LoginModel) {
    this.http
      .post('http://localhost:3000/auth', body)
      .subscribe(response => {});
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

  getIsUniqe() {
    return;
  }

  logout() {
    localStorage.clear();
    // this.tostr.success('You ware logged out!');
    this.router.navigate(['']);
  }
}
