import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { UpsertCategoryDto } from '../../../core/models/api.models';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css'
})
export class AdminCategories implements OnInit {
  adminService = inject(AdminService);
  categoriesService = inject(CategoriesService);
  
  categories: any[] = [];
  isLoading = true;
  isSubmitting = false;

  newCategory: UpsertCategoryDto = {
    name: '',
    iconUrl: '',
    parentCategoryId: null
  };

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load categories', err);
      }
    });
  }

  createCategory() {
    if (!this.newCategory.name) return;
    this.isSubmitting = true;
    this.adminService.createCategory(this.newCategory).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.newCategory = { name: '', iconUrl: '', parentCategoryId: null };
        this.loadCategories();
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Failed to create category', err);
        alert('Failed to create category');
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.adminService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete category', err);
          alert('Failed to delete category');
        }
      });
    }
  }
}
