export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: string;
  location?: string;
  bio?: string;
  rating?: number;
  reviewCount?: number;
  activeListings?: number;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agreeToTerms: boolean;
}
