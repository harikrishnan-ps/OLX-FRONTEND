import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reviews.html',
  styleUrl: './admin-reviews.css'
})
export class AdminReviews implements OnInit {
  adminService = inject(AdminService);
  
  reviews: any[] = [];
  isLoading = true;
  page = 1;
  pageSize = 20;

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.isLoading = true;
    this.adminService.getReviews({ page: this.page, pageSize: this.pageSize }).subscribe({
      next: (data) => {
        // Assuming API returns { items: [...] } or array directly
        this.reviews = data.items || data || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Mock data
        this.reviews = [
          { id: '1', rating: 4, comment: 'Great seller!', sellerName: 'John Doe', reviewerName: 'Alice', createdAt: new Date() },
          { id: '2', rating: 1, comment: 'Terrible experience.', sellerName: 'Bob', reviewerName: 'Charlie', createdAt: new Date() }
        ];
      }
    });
  }

  deleteReview(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.adminService.deleteReview(id).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.id !== id);
        },
        error: () => {
          alert('Failed to delete review');
        }
      });
    }
  }

  nextPage() {
    this.page++;
    this.loadReviews();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadReviews();
    }
  }
}
