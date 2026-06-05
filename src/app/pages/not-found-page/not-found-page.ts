import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <div class="page-with-navbar-and-bottom-nav">
      <div class="container section-padding text-center" style="padding-top: 100px;">
        <span class="material-symbols-outlined" style="font-size: 80px; color: var(--color-outline);">error</span>
        <h1 style="font-size: 32px; font-weight: 800; margin: 16px 0;">404</h1>
        <h2 style="font-size: 20px; margin-bottom: 8px;">Oops! Page not found</h2>
        <p style="color: var(--color-outline); margin-bottom: 24px;">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a routerLink="/" class="btn-primary" style="display: inline-flex;">Go to Homepage</a>
      </div>
    </div>
  `
})
export class NotFoundPage {}
