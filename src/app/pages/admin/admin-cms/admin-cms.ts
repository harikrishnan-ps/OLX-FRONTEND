import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { UpsertStaticPageDto } from '../../../core/models/api.models';

@Component({
  selector: 'app-admin-cms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-cms.html',
  styleUrl: './admin-cms.css'
})
export class AdminCms {
  adminService = inject(AdminService);
  
  slugs = ['terms-of-service', 'privacy-policy', 'about-us', 'help-center'];
  selectedSlug = 'terms-of-service';
  isLoading = false;
  
  pageData: UpsertStaticPageDto = {
    title: '',
    htmlContent: ''
  };

  savePage() {
    if (!this.pageData.title || !this.pageData.htmlContent) return;
    this.isLoading = true;
    this.adminService.updateCms(this.selectedSlug, this.pageData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Page updated successfully!');
      },
      error: () => {
        this.isLoading = false;
        alert('Failed to update page');
      }
    });
  }

  onSlugChange() {
    // In a real app, we would load the existing page data for the selected slug here.
    // For now we just reset the form.
    this.pageData = { title: '', htmlContent: '' };
  }
}
