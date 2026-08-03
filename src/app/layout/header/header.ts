import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, InputComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly menuOpen = signal(false);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;

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
}
