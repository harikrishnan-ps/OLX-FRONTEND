import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import { SellerCard } from '../../shared/seller-card/seller-card';
import { ProductCard } from '../../shared/product-card/product-card';
import { ReviewsList } from '../../shared/reviews-list/reviews-list';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, SellerCard, ProductCard, ReviewsList],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  product: Product | null = null;
  relatedProducts: Product[] = [];
  isLoading = true;
  activeImageIndex = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProductDetails(id);
      }
    });
  }

  fetchProductDetails(id: string): void {
    this.isLoading = true;
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
        window.scrollTo(0, 0);

        if (product.categorySlug) {
            this.productsService.getRelatedProducts(id, product.categorySlug).subscribe({
                next: (relatedData) => {
                    this.relatedProducts = relatedData.items;
                }
            });
        }
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get timeAgo(): string {
    if (!this.product) return '';
    const diffHours = Math.floor((new Date().getTime() - new Date(this.product.postedAt).getTime()) / (1000 * 60 * 60));
    return diffHours < 24 ? `${diffHours} hrs ago` : `${Math.floor(diffHours/24)} days ago`;
  }
}
