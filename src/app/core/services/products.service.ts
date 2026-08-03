import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../models/environment';
import { ProductsResponse } from '../models/products/products-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(limit: number, skip: number, search?: string, category?: string) {
    let url = `${environment.apiUrl}/products`;

    if (search) {
      url = `${environment.apiUrl}/products/search?q=${search}`;
    }

    if (category) {
      url = `${environment.apiUrl}/products/category/${category}`;
    }

    // The search endpoint already contains a query string (?q=),
    // while the category endpoint does not.
    // We choose the correct separator (?) or (&) to build a valid URL.
    const separator = url.includes('?') ? '&' : '?';
    return this.http.get<ProductsResponse>(`${url}${separator}limit=${limit}&skip=${skip}`);
  }
}
