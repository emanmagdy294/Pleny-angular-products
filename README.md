# ClickTik Store
Angular 21 application developed for the Pleny Frontend Technical Assessment.

---

## Live Demo
https://pleny-angular-products.vercel.app/

---

## Tech Stack

- Angular 21
- Standalone Components
- Signals
- Zoneless Change Detection
- SCSS
- RxJS
- Functional HTTP Interceptors
- Functional Route Guards

---

## Features

- User Authentication
- Protected Products Page
- Product Search (debounced using RxJS)
- Category Filtering
- Products Pagination
- Add Products to Cart
- Cart Counter
- Automatic Access Token Refresh
- Dark Mode
- Lazy Loaded Routes
- Responsive Design
- Reusable Shared UI Components

---

## Run the Project

Install dependencies:
npm install

Run the development server:
ng serve

The application will be available at:

http://localhost:4200

---

## Project Structure

The project follows a feature-based architecture.

src/
 ─ core/
 ─ features/
 ─ shared/

### core

Contains:

- Services
- Guards
- HTTP Interceptors
- Models

### features

Contains all feature pages and feature-specific components.

### shared

Contains reusable UI components such as:

- Button
- Input
- Product Card
- Pagination
- Sidebar
- Breadcrumb

---

## State Management

This application follows a **Signals-first** approach as recommended in Angular 21.

It uses:

- `signal()` for local component state.
- `computed()` for derived state.
- RxJS only for asynchronous streams such as debounced product search.

NgRx SignalStore was not implemented because it is listed as a bonus requirement and Signals were sufficient for the current application size.

---

## Notes

- Route query parameters are the source of truth for search, pagination and category filtering.
- Authentication is handled using a functional HTTP interceptor and a functional route guard.
- Access tokens are automatically refreshed using the Refresh Token endpoint.
- The application uses zoneless change detection with `provideZonelessChangeDetection()`.

---

## Future Improvements

With more time I would add:

- Loading Skeleton components
- Better Empty State UI
- Unit Tests using Vitest
- NgRx SignalStore
- Optimistic Cart Updates
