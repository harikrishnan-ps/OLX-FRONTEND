export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  categorySlug: string;
  condition: 'brand-new' | 'used-like-new' | 'used-good' | 'used-fair' | 'for-parts';
  location: ProductLocation;
  seller: SellerInfo;
  specs?: Record<string, string>;
  featured?: boolean;
  postedAt: string;
  expiresAt?: string;
  views?: number;
  favorites?: number;
  isFavorited?: boolean;
  status: 'active' | 'sold' | 'expired' | 'pending';
}

export interface ProductLocation {
  city: string;
  neighborhood?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
}

export interface SellerInfo {
  id: string;
  name: string;
  avatar?: string;
  rating?: number;
  reviewCount?: number;
  memberSince?: string;
  responseTime?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export interface ProductFilter {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  location?: string;
  radius?: number;
  sortBy?: 'recommended' | 'newest' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
}

export interface ProductSearchResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
