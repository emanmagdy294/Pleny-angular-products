import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../../shared/ui/input/input';
import { ButtonComponent } from '../../../shared/ui/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly username = signal('');
  readonly password = signal('');
  readonly errorMessage = signal('');

  // Authenticates the user and stores the returned tokens
  // before navigating to the products page.
  login(): void {
    this.authService
      .login({
        username: this.username(),

        password: this.password(),

        expiresInMins: 30,
      })
      .subscribe({
        next: (response) => {
          this.errorMessage.set('');
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.router.navigate(['/products']);
        },

        error: () => {
          this.errorMessage.set('Invalid username or password.');
        },
      });
  }
}
