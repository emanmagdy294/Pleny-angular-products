import { Component, input, computed, inject } from '@angular/core';
import { Product } from '../../../../core/models/products/product';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [ButtonComponent],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly rating = computed(() => Math.round(this.product().rating));

  private readonly cartService = inject(CartService);
  readonly isAdded = computed(() => this.cartService.isInCart(this.product().id));

  addToCart(): void {
    this.cartService.addToCart(this.product());
  }
}
