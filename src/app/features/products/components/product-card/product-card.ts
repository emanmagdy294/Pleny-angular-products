import { Component, input, computed } from '@angular/core';
import { Product } from '../../../../core/models/products/product';
import { ButtonComponent } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-product-card',
  imports: [ButtonComponent],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly rating = computed(() => Math.round(this.product().rating));
}
