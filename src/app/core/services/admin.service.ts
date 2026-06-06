import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  AdminDashboardStatsDto, UpsertCategoryDto, UpsertStaticPageDto, 
  CreateBannerDto, BannerDto, BlockUserDto, UpdateListingStatusDto 
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  // Dashboard
  getStats(): Observable<AdminDashboardStatsDto> {
    return this.http.get<AdminDashboardStatsDto>(`${environment.apiUrl}/admin/dashboard/stats`);
  }
  getCharts(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/dashboard/charts`);
  }

  // Users
  getUsers(params?: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/users`, { params });
  }
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/users/${id}`);
  }
  blockUser(id: string, isBlocked: boolean, reason: string): Observable<void> {
    const dto: BlockUserDto = { isBlocked, reason };
    return this.http.patch<void>(`${environment.apiUrl}/admin/users/${id}/block`, dto);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/admin/users/${id}`);
  }

  // Listings
  getListings(params?: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/listings`, { params });
  }
  updateListingStatus(id: string, status: string, isFeatured: boolean): Observable<void> {
    const dto: UpdateListingStatusDto = { status, isFeatured };
    return this.http.patch<void>(`${environment.apiUrl}/admin/listings/${id}/status`, dto);
  }
  deleteListing(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/listings/${id}`);
  }

  // Reports
  getReports(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/reports`);
  }
  getReport(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/reports/${id}`);
  }
  resolveReport(id: string, status: string): Observable<void> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<void>(`${environment.apiUrl}/admin/reports/${id}/resolve`, {}, { params });
  }

  // Reviews
  getReviews(params?: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/reviews`, { params });
  }
  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/reviews/${id}`);
  }

  // Categories
  createCategory(data: UpsertCategoryDto): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/admin/categories`, data);
  }
  updateCategory(id: number, data: UpsertCategoryDto): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/admin/categories/${id}`, data);
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/categories/${id}`);
  }

  // CMS
  updateCms(slug: string, data: UpsertStaticPageDto): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/admin/cms/${slug}`, data);
  }

  // Banners
  createBanner(data: CreateBannerDto): Observable<BannerDto> {
    return this.http.post<BannerDto>(`${environment.apiUrl}/admin/banners`, data);
  }
  deleteBanner(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/banners/${id}`);
  }
}
