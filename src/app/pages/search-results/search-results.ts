import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { ProductCard } from '../../shared/product-card/product-card';
import { FilterSidebar } from '../../shared/filter-sidebar/filter-sidebar';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, ProductCard, FilterSidebar],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  searchQuery = '';
  products: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.fetchResults();
    });
  }

  fetchResults(): void {
    this.isLoading = true;
    this.productsService.getProducts({ query: this.searchQuery }).subscribe({
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
