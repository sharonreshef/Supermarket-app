import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  constructor(private http: HttpClient) {}
}
