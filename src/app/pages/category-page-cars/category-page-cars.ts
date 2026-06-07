import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { ProductCard } from '../../shared/product-card/product-card';
import { FilterSidebar } from '../../shared/filter-sidebar/filter-sidebar';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-category-page-cars',
  imports: [CommonModule, ProductCard, FilterSidebar],
  templateUrl: '../search-results/search-results.html', // Reuse search layout
  styleUrl: '../search-results/search-results.scss',
})
export class CategoryPageCars implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  categoriesService = inject(CategoriesService);

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
    const cats = this.categoriesService.categories();
    const category = cats.find(c => c.slug === this.searchQuery || c.id === this.searchQuery);
    const categoryId = category ? category.id : this.searchQuery;

    this.productsService.getProducts({ category: categoryId }).subscribe({
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
