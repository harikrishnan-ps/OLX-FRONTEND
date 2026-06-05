import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewChecked, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { ChatConversation, ChatMessage } from '../../core/models/chat.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-interface',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chat-interface.html',
  styleUrl: './chat-interface.scss',
})
export class ChatInterface implements OnInit, AfterViewChecked {
  chatService = inject(ChatService);
  
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  newMessage = signal('');
  
  conversations = signal<ChatConversation[]>([]);
  activeConversationId = signal<string>('');
  messages = signal<ChatMessage[]>([]);

  activeConversation = computed(() => {
    return this.conversations().find(c => c.id === this.activeConversationId());
  });

  ngOnInit(): void {
    this.chatService.getConversations().subscribe({
      next: (data) => {
        this.conversations.set(data);
        if (data.length > 0) {
          this.selectConversation(data[0].id);
        }
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  selectConversation(id: string): void {
    this.activeConversationId.set(id);
    const conv = this.activeConversation();
    if (conv) {
      this.chatService.getChatHistory(conv.participant.id, conv.product.id).subscribe({
        next: (history) => {
          this.messages.set(history);
        }
      });
    }
  }

  sendMessage(): void {
    const content = this.newMessage().trim();
    const conv = this.activeConversation();
    if (content && conv) {
      this.chatService.sendMessage(conv.product.id, conv.participant.id, content).subscribe({
        next: (msg) => {
          this.messages.update(msgs => [...msgs, msg]);
          this.newMessage.set('');
        }
      });
    }
  }
}
