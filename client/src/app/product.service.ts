import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import ProductModel from './core/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProductsFromServer(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(
      `http://localhost:3000/products/`
    );
  }
  // getApartmentDetailsFromServer(id: string): Observable<Product> {
  //   return this.httpClient.get<Apartment>(
  //     `http://localhost:3000/apartments/${id}`
  //   );
  // }

  // addApartmentToServer(apartment: Apartment): Observable<Product> {
  //   return this.httpClient.post<Apartment>(
  //     `http://localhost:3000/apartments/`,
  //     apartment
  //   );
  // }
  // deleteApartmentFromServer(id: string): Observable<Apartment> {
  //   console.log('delete from server');
  //   return this.httpClient.delete<Apartment>(
  //     `http://localhost:3000/apartments/${id}`
  //   );
  // }
}
