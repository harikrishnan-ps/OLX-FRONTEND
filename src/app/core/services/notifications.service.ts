import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private http = inject(HttpClient);

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.apiBaseUrl}/notifications`);
  }

  markAsRead(id: string): Observable<void> {
    return this.http.patch<void>(`${environment.apiBaseUrl}/notifications/${id}/read`, {});
  }
}
