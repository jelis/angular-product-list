import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetails, ProductList } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // usually this would be an environment variable
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  getProducts(query: string, skip: number, limit: number): Observable<ProductList> {
    return this.http.get<ProductList>(`${this.apiUrl}/search?q=${query}&skip=${skip}&limit=${limit}`);
  }

  getProductById(id: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.apiUrl}/${id}`);
  }
}