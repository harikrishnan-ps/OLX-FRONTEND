import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatConversation, ChatMessage } from '../models/chat.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  getConversations(): Observable<ChatConversation[]> {
    return this.http.get<ChatConversation[]>(`${environment.apiBaseUrl}/chat/conversations`);
  }

  getChatHistory(otherUserId: string, listingId: string): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('otherUserId', otherUserId)
      .set('listingId', listingId);
    return this.http.get<ChatMessage[]>(`${environment.apiBaseUrl}/chat/history`, { params });
  }

  markMessageAsRead(messageId: string): Observable<void> {
    return this.http.patch<void>(`${environment.apiBaseUrl}/chat/messages/${messageId}/read`, {});
  }

  deleteConversation(otherUserId: string, listingId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/chat/conversations`, {
      body: { otherUserId, listingId }
    });
  }

  // NOTE: The API documentation does not explicitly show a POST /api/chat endpoint to send a message.
  // It only shows getting history. We'll add a placeholder that would hit a typical send endpoint, or use websockets.
  sendMessage(listingId: string, receiverId: string, content: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${environment.apiBaseUrl}/chat/messages`, {
      listingId,
      receiverId,
      content
    });
  }
}
