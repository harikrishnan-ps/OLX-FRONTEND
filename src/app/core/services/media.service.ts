import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private http = inject(HttpClient);

  upload(files: File[], type: string): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('type', type);

    return this.http.post(`${environment.apiBaseUrl}/media/upload`, formData);
  }
}
