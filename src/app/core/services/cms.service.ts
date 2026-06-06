import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BannerDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class CmsService {
  private http = inject(HttpClient);

  getPage(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/cms/${slug}`);
  }

  getBanners(): Observable<BannerDto[]> {
    return this.http.get<BannerDto[]>(`${environment.apiUrl}/banners`);
  }

  getFaq(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/cms/faq`);
  }
}
