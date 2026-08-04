import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly isLoggedIn = signal(
    !!localStorage.getItem('accessToken')
  );

  login(body: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      body
    );
  }

  refreshToken(refreshToken: string) {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/refresh`,
      {
        refreshToken,
        expiresInMins: 30,
      }
    );
  }

  saveTokens(response: LoginResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    this.isLoggedIn.set(true);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.isLoggedIn.set(false);
  }
}