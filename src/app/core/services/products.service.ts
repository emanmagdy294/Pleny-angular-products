import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../models/environment';
import { ProductsResponse } from '../models/products/products-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly http = inject(HttpClient);

  getProducts() {

    return this.http.get<ProductsResponse>(
      `${environment.apiUrl}/products`
    );

  }

}