import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private http = inject(HttpClient);

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/wishlist`);
  }

  addToWishlist(listingId: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/wishlist/${listingId}`, {});
  }

  removeFromWishlist(listingId: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/wishlist/${listingId}`);
  }
}
