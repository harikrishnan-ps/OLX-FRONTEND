import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification as AppNotification } from '../models/notification.model';
import { environment } from '../../../environments/environment';
import { NotificationDto } from '../models/api.models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private http = inject(HttpClient);

  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<NotificationDto[]>(`${environment.apiUrl}/notifications`).pipe(
      map(dtos => dtos.map(dto => ({
        id: dto.id || '',
        title: dto.type || 'Notification',
        description: dto.message || '',
        timestamp: dto.createdAt || new Date().toISOString(),
        isRead: dto.isRead || false,
        type: (dto.type as any) || 'system',
        icon: 'notifications', // default icon
        actionUrl: ''
      })))
    );
  }

  markAsRead(id: string): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/notifications/${id}/read`, {});
  }
}
