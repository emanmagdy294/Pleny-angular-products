import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { catchError, switchMap, throwError } from 'rxjs';
// // TO any request that comes out of the application, pass it through this function first"
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();

  const authRequest = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = authService.getRefreshToken();

      if (!refreshToken) {
        authService.logout();
        return throwError(() => error);
      }

      return authService.refreshToken(refreshToken).pipe(
        switchMap((response) => {
          authService.saveTokens(response);

          const retryRequest = authRequest.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });

          return next(retryRequest);
        }),

        catchError((refreshError) => {
          authService.logout();

          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
