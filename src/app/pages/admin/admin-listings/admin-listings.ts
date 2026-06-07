import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-listings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-listings.html',
  styleUrl: './admin-listings.css'
})
export class AdminListings implements OnInit {
  adminService = inject(AdminService);
  
  listings: any[] = [];
  isLoading = true;
  searchQuery = '';
  statusFilter = '';
  page = 1;
  pageSize = 20;
  totalCount = 0;

  ngOnInit() {
    this.loadListings();
  }

  loadListings() {
    this.isLoading = true;
    const params: any = { page: this.page, pageSize: this.pageSize };
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.statusFilter) params.status = this.statusFilter;

    this.adminService.getListings(params).subscribe({
      next: (data) => {
        this.listings = data.items || data || [];
        this.totalCount = data.totalCount || this.listings.length;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load listings', err);
      }
    });
  }

  onSearch() {
    this.page = 1;
    this.loadListings();
  }

  updateStatus(id: string, newStatus: string, isFeatured: boolean) {
    this.adminService.updateListingStatus(id, newStatus, isFeatured).subscribe({
      next: () => {
        const listing = this.listings.find(l => l.id === id);
        if (listing) {
          listing.status = newStatus;
          listing.isFeatured = isFeatured;
        }
      },
      error: () => alert('Failed to update listing status')
    });
  }

  deleteListing(id: string) {
    if (confirm('Are you sure you want to delete this listing?')) {
      this.adminService.deleteListing(id).subscribe({
        next: () => {
          this.listings = this.listings.filter(l => l.id !== id);
        },
        error: () => alert('Failed to delete listing')
      });
    }
  }

  nextPage() {
    if (this.listings.length === this.pageSize) {
      this.page++;
      this.loadListings();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadListings();
    }
  }
}
