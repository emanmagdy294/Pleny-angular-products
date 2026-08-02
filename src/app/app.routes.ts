import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/products/products').then((m) => m.Products),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
