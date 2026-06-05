import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { ProductCard } from '../../shared/product-card/product-card';
import { FilterSidebar } from '../../shared/filter-sidebar/filter-sidebar';

@Component({
  selector: 'app-category-page-cars',
  imports: [CommonModule, ProductCard, FilterSidebar],
  templateUrl: '../search-results/search-results.html', // Reuse search layout
  styleUrl: '../search-results/search-results.scss',
})
export class CategoryPageCars implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  searchQuery = '';
  products: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('slug') || '';
      this.fetchResults();
    });
  }

  fetchResults(): void {
    this.isLoading = true;
    this.productsService.getProducts({ category: this.searchQuery }).subscribe({
      next: (data) => {
        this.products = data.items;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
