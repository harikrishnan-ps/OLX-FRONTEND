import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ListingImageDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private http = inject(HttpClient);

  uploadListingMedia(listingId: string, files: File[]): Observable<ListingImageDto[]> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<ListingImageDto[]>(`${environment.apiUrl}/media/upload/${listingId}`, formData);
  }

  uploadProfileMedia(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${environment.apiUrl}/media/upload/profile`, formData);
  }

  setPrimaryImage(id: string): Observable<ListingImageDto> {
    return this.http.patch<ListingImageDto>(`${environment.apiUrl}/media/${id}/primary`, {});
  }
}
