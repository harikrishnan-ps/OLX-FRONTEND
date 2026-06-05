import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CmsService {
  private http = inject(HttpClient);

  getPage(slug: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/cms/${slug}`);
  }

  getBanners(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/cms/banners`);
  }

  getFaq(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/cms/faq`);
  }
}
