import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  showNavbar = true;
  showFooter = true;

  private readonly hiddenNavbarRoutes = ['/auth/'];
  private readonly hiddenFooterRoutes = ['/auth/', '/chat', '/post-ad'];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.showNavbar = !this.hiddenNavbarRoutes.some(r => url.startsWith(r));
        this.showFooter = !this.hiddenFooterRoutes.some(r => url.startsWith(r));
      }
    });
  }
}
