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
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // Mock data
        this.categories = [
          { id: 1, name: 'Cars', iconUrl: 'directions_car', parentCategoryId: null },
          { id: 2, name: 'Mobiles', iconUrl: 'smartphone', parentCategoryId: null },
          { id: 3, name: 'Sedan', iconUrl: '', parentCategoryId: 1 }
        ];
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
      error: () => {
        this.isSubmitting = false;
        alert('Failed to create category');
        
        // Mock fallback to update UI
        const id = Math.max(...this.categories.map(c => c.id)) + 1;
        this.categories.push({ ...this.newCategory, id });
        this.newCategory = { name: '', iconUrl: '', parentCategoryId: null };
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.adminService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: () => {
          alert('Failed to delete category');
          // Mock delete
          this.categories = this.categories.filter(c => c.id !== id);
        }
      });
    }
  }
}
