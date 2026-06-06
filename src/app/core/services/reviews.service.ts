import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateReviewDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private http = inject(HttpClient);

  getUserReviews(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/reviews/seller/${userId}`);
  }

  createReview(listingId: string, rating: number, comment: string): Observable<void> {
    const dto: CreateReviewDto = { sellerId: listingId, rating, comment };
    return this.http.post<void>(`${environment.apiUrl}/reviews`, dto);
  }
}
