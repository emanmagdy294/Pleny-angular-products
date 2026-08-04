import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Stores cart items in a signal and persists them in localStorage.

  readonly cartItems = signal<Product[]>(JSON.parse(localStorage.getItem('cart') ?? '[]'));

  readonly cartCount = computed(() => this.cartItems().length);

  addToCart(product: Product): void {
    const updatedCart = [...this.cartItems(), product];
    this.cartItems.set(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  isInCart(id: number): boolean {
    return this.cartItems().some((item) => item.id === id);
  }
}
