import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(body: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, body);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/refresh`, {
      refreshToken,
      expiresInMins: 30,
    });
  }
}
