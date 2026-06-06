import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatConversation, ChatMessage } from '../models/chat.model';
import { environment } from '../../../environments/environment';
import { MessageResponseDto, DeleteConversationDto } from '../models/api.models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  getConversations(): Observable<ChatConversation[]> {
    return this.http.get<ChatConversation[]>(`${environment.apiUrl}/chat/conversations`);
  }

  getChatHistory(otherUserId: string, listingId: string): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('otherUserId', otherUserId)
      .set('listingId', listingId);
    return this.http.get<MessageResponseDto[]>(`${environment.apiUrl}/chat/history`, { params }).pipe(
      map(dtos => dtos.map(dto => ({
        id: dto.id || '',
        conversationId: listingId,
        senderId: dto.senderId || '',
        content: dto.content || '',
        timestamp: dto.sentAt || new Date().toISOString(),
        type: 'text',
        status: dto.isRead ? 'read' : 'delivered'
      })))
    );
  }

  markMessageAsRead(messageId: string): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/chat/messages/${messageId}/read`, {});
  }

  deleteConversation(otherUserId: string, listingId: string): Observable<void> {
    const dto: DeleteConversationDto = { otherUserId, listingId };
    return this.http.delete<void>(`${environment.apiUrl}/chat/conversations`, {
      body: dto
    });
  }

  // NOTE: The API documentation does not explicitly show a POST /api/chat endpoint to send a message.
  // It only shows getting history. We'll add a placeholder that would hit a typical send endpoint, or use websockets.
  sendMessage(listingId: string, receiverId: string, content: string): Observable<ChatMessage> {
    // API doesn't define this, but assuming it returns MessageResponseDto
    return this.http.post<MessageResponseDto>(`${environment.apiUrl}/chat/messages`, {
      listingId,
      receiverId,
      content
    }).pipe(
      map(dto => ({
        id: dto.id || '',
        conversationId: listingId,
        senderId: dto.senderId || '',
        content: dto.content || '',
        timestamp: dto.sentAt || new Date().toISOString(),
        type: 'text',
        status: dto.isRead ? 'read' : 'delivered'
      }))
    );
  }
}
