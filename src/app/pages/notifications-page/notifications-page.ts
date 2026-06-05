import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../core/services/notifications.service';
import { RouterLink } from '@angular/router';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'app-notifications-page',
  imports: [CommonModule],
  templateUrl: './notifications-page.html',
  styleUrl: './notifications-page.scss',
})
export class NotificationsPage implements OnInit {
  notificationsService = inject(NotificationsService);
  
  notifications = signal<Notification[]>([]);

  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (data) => {
        this.notifications.set(data);
      }
    });
  }

  markAsRead(id: string): void {
    this.notificationsService.markAsRead(id).subscribe({
      next: () => {
        this.notifications.update(notifs => 
          notifs.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
      }
    });
  }

  markAllAsRead(): void {
    // API doesn't support markAllAsRead, so we'll just loop through unread
    this.notifications().forEach(n => {
      if (!n.isRead) {
        this.markAsRead(n.id);
      }
    });
  }

  clearAll(): void {
    // API doesn't support delete/clear notifications. We'll just clear locally.
    this.notifications.set([]);
  }
}
