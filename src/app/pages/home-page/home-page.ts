import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { ProductCard } from '../../shared/product-card/product-card';
import { CategoryMenu } from '../../shared/category-menu/category-menu';
import { SearchBar } from '../../shared/search-bar/search-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCard, CategoryMenu, SearchBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
  router = inject(Router);

  products: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.productsService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.products = data.items;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  toggleFavorite(productId: string): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.isFavorited = !product.isFavorited;
    }
  }
}
