import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  authService = inject(AuthService);
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks = [
    { label: 'Categories', route: '/category/electronics' },
    { label: 'Deals', route: '/search' },
  ];

  protected readonly iconButtons = [
    { icon: 'notifications', route: '/notifications', label: 'Notifications' },
    { icon: 'chat', route: '/chat', label: 'Chat' },
    { icon: 'favorite', route: '/favourites', label: 'Favourites' },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}
