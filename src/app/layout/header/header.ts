import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input';
import { AuthService } from '../../core/services/auth.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink, InputComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly menuOpen = signal(false);
  readonly search = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly searchSubject = new Subject<string>();
  readonly isLoggedIn = this.authService.isLoggedIn;
  private readonly cartService = inject(CartService);
  readonly cartCount = this.cartService.cartCount;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(600), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.router.navigate([], {
          relativeTo: this.route,

          queryParams: {
            page: 1,
            search: value || null,
            category: null,
          },

          queryParamsHandling: 'merge',
        });
      });

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.search.set(params['search'] || '');
    });
  }
  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }
}
