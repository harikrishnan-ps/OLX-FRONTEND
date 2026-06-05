import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  // Dashboard
  getStats(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/dashboard/stats`);
  }
  getCharts(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/dashboard/charts`);
  }

  // Users
  getUsers(params?: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/users`, { params });
  }
  getUser(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/users/${id}`);
  }
  blockUser(id: string, isBlocked: boolean, reason: string): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/admin/users/${id}/block`, { isBlocked, reason });
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/admin/users/${id}`);
  }

  // Listings
  getListings(params?: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/listings`, { params });
  }
  updateListingStatus(id: string, status: string, isFeatured: boolean): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/admin/listings/${id}/status`, { status, isFeatured });
  }
  deleteListing(id: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/admin/listings/${id}`);
  }

  // Reports
  getReports(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/reports`);
  }
  getReport(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/reports/${id}`);
  }
  resolveReport(id: string, status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.patch(`${environment.apiBaseUrl}/admin/reports/${id}/resolve`, {}, { params });
  }

  // Reviews
  getReviews(params?: any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/admin/reviews`, { params });
  }
  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/admin/reviews/${id}`);
  }

  // Categories
  createCategory(data: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/admin/categories`, data);
  }
  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/admin/categories/${id}`, data);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/admin/categories/${id}`);
  }

  // CMS
  updateCms(slug: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/admin/cms/${slug}`, data);
  }

  // Banners
  createBanner(data: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/admin/banners`, data);
  }
  deleteBanner(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/admin/banners/${id}`);
  }
}
