import { HttpInterceptorFn } from '@angular/common/http';

// TO any request that comes out of the application, pass it through this function first"
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return next(req); //as login
  }

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
