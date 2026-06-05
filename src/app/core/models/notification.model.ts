export interface Notification {
  id: string;
  type: 'price_drop' | 'message' | 'ad_approved' | 'ad_expired' | 'system' | 'promo';
  title: string;
  description: string;
  icon: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  productTitle?: string;
}
