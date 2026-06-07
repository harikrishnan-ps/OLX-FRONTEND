import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private http = inject(HttpClient);
  
  private readonly _categories = signal<Category[]>([]);

  readonly categories = this._categories.asReadonly();

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>(`${environment.apiUrl}/categories`).subscribe({
      next: (data) => {
        // Map DTO to Category model
        const mapped = data.map(c => ({
          id: c.id.toString(),
          name: c.name,
          slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          icon: c.iconUrl || 'category',
          count: 0 // Count might not be provided by standard DTO
        }));
        this._categories.set(mapped);
      },
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  getCategoryBySlug(slug: string): Category | undefined {
    return this._categories().find(c => c.slug === slug);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/categories`);
  }
}
