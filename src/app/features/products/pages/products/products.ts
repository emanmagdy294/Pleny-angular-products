import { Component, inject, signal } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { ProductsSidebar } from '../../components/products-sidebar/products-sidebar';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/products/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [Breadcrumb, ProductsSidebar, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private readonly productsService = inject(ProductsService);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);

    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('Something went wrong.');
        this.loading.set(false);
      },
    });
  }
}
