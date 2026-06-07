import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product, ProductFilter, ProductSearchResult } from '../models/product.model';
import { ListingResponseDto, ListingResponseDtoPagedResultDto, CreateListingDto, UpdateListingDto } from '../models/api.models';
import { map } from 'rxjs/operators';

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
    return this.http.get<ListingResponseDtoPagedResultDto>(`${environment.apiUrl}/listings`, { params }).pipe(
      tap(() => this._loading.set(false)),
      map(res => this.mapPagedResultToSearchResult(res))
    );
  }

  private mapListingToProduct(dto: ListingResponseDto): Product {
    return {
      id: dto.id || '',
      title: dto.title || '',
      description: dto.description || '',
      price: dto.price || 0,
      currency: 'USD', // default
      images: dto.images ? dto.images.map((i: any) => i.url) : [],
      category: dto.categoryId?.toString() || '',
      categorySlug: dto.categoryId?.toString() || '',
      condition: (dto.condition as any) || 'used-good',
      location: { city: dto.cityId?.toString() || '' },
      seller: { id: '', name: 'Unknown Seller' }, // Need user details
      status: (dto.status as any) || 'active',
      featured: dto.isFeatured,
      postedAt: dto.createdAt || new Date().toISOString()
    };
  }

  private mapPagedResultToSearchResult(dto: ListingResponseDtoPagedResultDto): ProductSearchResult {
    return {
      items: (dto.items || []).map(item => this.mapListingToProduct(item)),
      total: dto.totalCount || 0,
      page: dto.page || 1,
      pageSize: dto.pageSize || 20,
      totalPages: Math.ceil((dto.totalCount || 0) / (dto.pageSize || 20))
    };
  }

  getMyProducts(): Observable<Product[]> {
    this._loading.set(true);
    return this.http.get<ListingResponseDto[]>(`${environment.apiUrl}/listings/my`).pipe(
      tap(() => this._loading.set(false)),
      map(res => (res || []).map(item => this.mapListingToProduct(item)))
    );
  }

  getProductById(id: string): Observable<Product> {
    this._loading.set(true);
    return this.http.get<ListingResponseDto>(`${environment.apiUrl}/listings/${id}`).pipe(
      tap(() => this._loading.set(false)),
      map(res => this.mapListingToProduct(res))
    );
  }

  getFeaturedProducts(): Observable<ProductSearchResult> {
    // API doesn't have a dedicated featured endpoint, so we fetch listings with a 'featured' sort/filter 
    // or just fetch first page. Let's assume we can pass a featured param or rely on the backend.
    let params = new HttpParams().set('PageSize', '8');
    return this.http.get<ListingResponseDtoPagedResultDto>(`${environment.apiUrl}/listings`, { params }).pipe(
      map(res => this.mapPagedResultToSearchResult(res))
    );
  }

  getRelatedProducts(productId: string, categoryId: string): Observable<ProductSearchResult> {
    let params = new HttpParams()
      .set('CategoryId', categoryId)
      .set('PageSize', '4');
    return this.http.get<ListingResponseDtoPagedResultDto>(`${environment.apiUrl}/listings`, { params }).pipe(
      map(res => this.mapPagedResultToSearchResult(res))
    );
  }

  createProduct(data: any): Observable<Product> {
    // Basic mapping for creation
    const dto: CreateListingDto = {
      title: data.title,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      cityId: data.cityId,
      condition: data.condition,
      isNegotiable: data.isNegotiable || false,
      status: data.status
    };
    return this.http.post<ListingResponseDto>(`${environment.apiUrl}/listings`, dto).pipe(
      map(res => this.mapListingToProduct(res))
    );
  }

  updateProduct(id: string, data: any): Observable<Product> {
    const dto: UpdateListingDto = {
      title: data.title,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      cityId: data.cityId,
      condition: data.condition,
      isNegotiable: data.isNegotiable || false,
      status: data.status || 'Active'
    };
    return this.http.put<ListingResponseDto>(`${environment.apiUrl}/listings/${id}`, dto).pipe(
      map(res => this.mapListingToProduct(res))
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/listings/${id}`);
  }

  markAsSold(id: string): Observable<Product> {
    return this.http.patch<ListingResponseDto>(`${environment.apiUrl}/listings/${id}/sold`, {}).pipe(
      map(res => this.mapListingToProduct(res))
    );
  }

  boostProduct(id: string): Observable<Product> {
    return this.http.patch<ListingResponseDto>(`${environment.apiUrl}/listings/${id}/boost`, {}).pipe(
      map(res => this.mapListingToProduct(res))
    );
  }
}
