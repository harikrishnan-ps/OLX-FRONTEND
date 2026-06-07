import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-my-ads-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-ads-dashboard.html',
  styleUrl: './my-ads-dashboard.scss'
})
export class MyAdsDashboard implements OnInit {
  productsService = inject(ProductsService);

  myProducts: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadMyAds();
  }

  loadMyAds() {
    this.isLoading = true;
    this.productsService.getMyProducts().subscribe({
      next: (products) => {
        this.myProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load my ads', err);
        this.isLoading = false;
      }
    });
  }

  deleteAd(id: string) {
    if (confirm('Are you sure you want to delete this ad?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.myProducts = this.myProducts.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete ad', err);
          alert('Failed to delete ad');
        }
      });
    }
  }

  markAsSold(id: string) {
    this.productsService.markAsSold(id).subscribe({
      next: (updatedProduct) => {
        const index = this.myProducts.findIndex(p => p.id === id);
        if (index !== -1) {
          this.myProducts[index] = updatedProduct;
        }
      },
      error: (err) => {
        console.error('Failed to mark as sold', err);
        alert('Failed to mark as sold');
      }
    });
  }
}
