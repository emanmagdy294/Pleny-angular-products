import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { ProductsSidebar } from '../../components/products-sidebar/products-sidebar';
import { ProductCard } from '../../components/product-card/product-card';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination';

import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/products/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  imports: [Breadcrumb, ProductsSidebar, ProductCard, PaginationComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly pageSize = 12;
  readonly currentPage = signal(1);
  readonly total = signal(0);
  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize));
  readonly search = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);
  categories = signal<string[]>([]);
  private productService = inject(ProductsService);
  readonly category = signal('');
  private readonly destroyRef = inject(DestroyRef);

  private readonly searchSubject = new Subject<{
    page: number;
    search: string;
    category: string;
  }>();

  ngOnInit(): void {
    this.productService.getCategories().subscribe((res) => {
      this.categories.set(res);
    });

    this.searchSubject
      .pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev.page === curr.page &&
            prev.search === curr.search &&
            prev.category === curr.category,
        ),
        switchMap(({ page, search, category }) => {
          this.loading.set(true);

          const skip = (page - 1) * this.pageSize;

          return this.productsService.getProducts(this.pageSize, skip, search, category);
        }),
        catchError(() => {
          this.errorMessage.set('Something went wrong.');
          this.loading.set(false);

          return of({
            products: [],
            total: 0,
            skip: 0,
            limit: this.pageSize,
          });
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const page = Number(params['page']) || 1;
      const search = params['search'] || '';
      const category = params['category'] || '';

      this.currentPage.set(page);
      this.search.set(search);
      this.category.set(category);

      this.searchSubject.next({
        page,
        search,
        category,
      });
    });
  }

  changePage(page: number): void {
    this.router.navigate([], {
      queryParams: {
        page,
        search: this.search() || null,
      },

      queryParamsHandling: 'merge',
    });
  }

  filterByCategory(category: string): void {
    this.router.navigate([], {
      queryParams: {
        page: 1,
        category: category === 'all' ? null : category,
        search: null,
      },

      queryParamsHandling: 'merge',
    });
  }
}
