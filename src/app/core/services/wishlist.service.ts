import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ListingResponseDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private http = inject(HttpClient);

  getWishlist(): Observable<ListingResponseDto[]> {
    return this.http.get<ListingResponseDto[]>(`${environment.apiUrl}/wishlist`);
  }

  addToWishlist(listingId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/wishlist/${listingId}`, {});
  }

  removeFromWishlist(listingId: string): Observable<void> {
    // Note: Assuming DELETE /api/wishlist/{listingId} exists though not explicitly in the HTML summary
    return this.http.delete<void>(`${environment.apiUrl}/wishlist/${listingId}`);
  }
}
