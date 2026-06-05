import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product, ProductFilter, ProductSearchResult } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  
  private http = inject(HttpClient);

  getProducts(filter?: ProductFilter): Observable<ProductSearchResult> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.query) params = params.set('Search', filter.query);
      if (filter.category) params = params.set('CategoryId', filter.category); // Assuming filter.category is ID now
      if (filter.minPrice) params = params.set('MinPrice', filter.minPrice.toString());
      if (filter.maxPrice) params = params.set('MaxPrice', filter.maxPrice.toString());
      if (filter.condition && filter.condition.length > 0) params = params.set('Condition', filter.condition.join(','));
      if (filter.page) params = params.set('Page', filter.page.toString());
      if (filter.pageSize) params = params.set('PageSize', filter.pageSize.toString());
    }

    this._loading.set(true);
    return this.http.get<ProductSearchResult>(`${environment.apiBaseUrl}/listings`, { params }).pipe(
      tap(() => this._loading.set(false))
    );
  }

  getProductById(id: string): Observable<Product> {
    this._loading.set(true);
    return this.http.get<Product>(`${environment.apiBaseUrl}/listings/${id}`).pipe(
      tap(() => this._loading.set(false))
    );
  }

  getFeaturedProducts(): Observable<ProductSearchResult> {
    // API doesn't have a dedicated featured endpoint, so we fetch listings with a 'featured' sort/filter 
    // or just fetch first page. Let's assume we can pass a featured param or rely on the backend.
    let params = new HttpParams().set('PageSize', '8');
    return this.http.get<ProductSearchResult>(`${environment.apiBaseUrl}/listings`, { params });
  }

  getRelatedProducts(productId: string, categoryId: string): Observable<ProductSearchResult> {
    let params = new HttpParams()
      .set('CategoryId', categoryId)
      .set('PageSize', '4');
    return this.http.get<ProductSearchResult>(`${environment.apiBaseUrl}/listings`, { params });
  }

  createProduct(data: any): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/listings`, data);
  }

  updateProduct(id: string, data: any): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/listings/${id}`, data);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/listings/${id}`);
  }

  markAsSold(id: string): Observable<Product> {
    return this.http.patch<Product>(`${environment.apiBaseUrl}/listings/${id}/sold`, {});
  }

  boostProduct(id: string): Observable<Product> {
    return this.http.patch<Product>(`${environment.apiBaseUrl}/listings/${id}/boost`, {});
  }
}
