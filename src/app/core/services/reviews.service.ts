import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  getUserReviews(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/reviews/user/${userId}`);
  }

  createReview(listingId: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/reviews`, { listingId, rating, comment });
  }
}
