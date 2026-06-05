import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-favourites-page',
  imports: [CommonModule, ProductCard],
  template: `
    <div class="page-with-navbar-and-bottom-nav bg-gray">
      <div class="container section-padding">
        <h1 class="text-headline-md mb-4">Your Favourites</h1>
        
        @if (isLoading) {
          <div class="loading-state">Loading your wishlist...</div>
        } @else if (products.length > 0) {
          <div class="product-grid">
            @for (product of products; track product.id) {
              <app-product-card [product]="product"></app-product-card>
            }
          </div>
        } @else {
          <div class="text-center" style="padding: 60px 0;">
            <span class="material-symbols-outlined" style="font-size: 64px; color: var(--color-outline);">favorite_border</span>
            <h2 class="mt-4">You haven't added any favourites yet.</h2>
            <p style="color: var(--color-outline);">Click the heart icon on any ad to save it here for later.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .bg-gray { background-color: var(--color-background); min-height: 100vh; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .loading-state { text-align: center; padding: 40px; color: var(--color-outline); }
  `]
})
export class FavouritesPage implements OnInit {
  wishlistService = inject(WishlistService);
  
  products: any[] = [];
  isLoading = true;

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
