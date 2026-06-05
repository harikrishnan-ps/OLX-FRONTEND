import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly _categories = signal<Category[]>([
    { id: '1', name: 'Electronics', slug: 'electronics', icon: 'smartphone', count: 1245 },
    { id: '2', name: 'Vehicles', slug: 'vehicles', icon: 'directions_car', count: 892 },
    { id: '3', name: 'Property', slug: 'property', icon: 'real_estate_agent', count: 534 },
    { id: '4', name: 'Furniture', slug: 'furniture', icon: 'chair', count: 678 },
    { id: '5', name: 'Fashion', slug: 'fashion', icon: 'checkroom', count: 1102 },
    { id: '6', name: 'Sports', slug: 'sports', icon: 'fitness_center', count: 445 },
    { id: '7', name: 'Books', slug: 'books', icon: 'menu_book', count: 312 },
    { id: '8', name: 'Jobs', slug: 'jobs', icon: 'work', count: 789 },
  ]);

  readonly categories = this._categories.asReadonly();

  getCategoryBySlug(slug: string): Category | undefined {
    return this._categories().find(c => c.slug === slug);
  }
}
