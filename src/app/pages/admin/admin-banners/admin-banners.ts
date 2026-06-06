import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { BannerDto, CreateBannerDto } from '../../../core/models/api.models';

@Component({
  selector: 'app-admin-banners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-banners.html',
  styleUrl: './admin-banners.css'
})
export class AdminBanners implements OnInit {
  adminService = inject(AdminService);
  
  banners: BannerDto[] = [];
  isLoading = false;
  
  newBanner: CreateBannerDto = {
    imageUrl: '',
    linkUrl: '',
    placementType: 'Homepage',
    isActive: true
  };

  ngOnInit() {
    this.loadBanners();
  }

  loadBanners() {
    // There is no getBanners in AdminService based on the provided schema/service, 
    // so we mock loading banners if not available.
    this.banners = [
      { id: 1, imageUrl: 'https://placehold.co/800x200', linkUrl: '/search', placementType: 'Homepage', isActive: true }
    ];
  }

  createBanner() {
    if (!this.newBanner.imageUrl) return;
    this.isLoading = true;
    this.adminService.createBanner(this.newBanner).subscribe({
      next: (banner) => {
        this.banners.push(banner);
        this.isLoading = false;
        this.newBanner = { imageUrl: '', linkUrl: '', placementType: 'Homepage', isActive: true };
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to create banner');
      }
    });
  }

  deleteBanner(id: number) {
    if (confirm('Are you sure you want to delete this banner?')) {
      this.adminService.deleteBanner(id).subscribe({
        next: () => {
          this.banners = this.banners.filter(b => b.id !== id);
        },
        error: () => {
          alert('Failed to delete banner');
        }
      });
    }
  }
}
