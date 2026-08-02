import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input';
interface NavLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink,InputComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly menuOpen = signal(false);

  readonly links: NavLink[] = [

    {
      label: 'Log in',
      route: '/login',
    },
  ];

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
