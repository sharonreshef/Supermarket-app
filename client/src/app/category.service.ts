import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategoriesFromServer(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`http://localhost:3000/categories`);
  }
}
