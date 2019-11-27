import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { RegisterModel } from "../models/auth/register.model";
import { LoginModel } from "../models/auth/login.model";
import { ClearCart } from "../store/cart/cart.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {}

  isIdUnique: boolean = false;
  checkID(customerID: string) {
    const body = {
      customerID: customerID
    };
    this.http
      .post<boolean>("http://localhost:3000/customers/checkID", body)
      .subscribe(response => {
        if (response) this.isIdUnique = true;
        else {
          this.isIdUnique = false;
        }
      });
  }

  createUser(
    email: string,
    password: string,
    id: number,
    city: string,
    street: string,
    firstName: string,
    lastName: string
  ) {
    const body: RegisterModel = {
      email: email,
      password: password,
      customerID: id,
      city: city,
      street: street,
      firstName: firstName,
      lastName: lastName
    };
    this.http
      .post("http://localhost:3000/customers", body)
      .subscribe(response => {
        this.router.navigate([""]);
      });
  }

  login(body: LoginModel) {
    console.log(body);
    this.http
      .post<any>("http://localhost:3000/auth", body)
      .subscribe(response => {
        if (response.payload.isAdmin) {
          this.router.navigate(["/products"]);
        }
      });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getUserCity() {
    return localStorage.getItem("city");
  }

  getUserStreet() {
    return localStorage.getItem("street");
  }

  isAuth() {
    return !!localStorage.getItem("token");
  }

  getIsAdmin() {
    return localStorage.getItem("isAdmin") === "true";
  }

  getIsUniqe() {
    return;
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(new ClearCart());
    this.router.navigate([""]);
  }
}
