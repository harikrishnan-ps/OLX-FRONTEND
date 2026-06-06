export interface RegisterDto {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginDto {
  identifier?: string;
  password?: string;
}

export interface VerifyOtpDto {
  email?: string;
  otp?: string;
}

export interface ResendOtpDto {
  email?: string;
}

export interface ForgotPasswordDto {
  email?: string;
}

export interface ResetPasswordDto {
  email?: string;
  otp?: string;
  newPassword?: string;
}

export interface RefreshTokenRequestDto {
  token?: string;
  refreshToken?: string;
}

export interface UserDto {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
}

export interface AuthResponseDto {
  token?: string;
  refreshToken?: string;
  user?: UserDto;
}

export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface UpdateProfileDto {
  fullName?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
}

export interface UserProfileDto {
  id?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  role?: string;
  userTier?: string;
  adQuotaRemaining?: number;
  createdAt?: string;
}

export interface CreateListingDto {
  title?: string;
  description?: string;
  price?: number;
  isNegotiable?: boolean;
  cityId?: number;
  categoryId?: number;
  condition?: string;
  specificationsJson?: string;
}

export interface UpdateListingDto {
  title?: string;
  description?: string;
  price?: number;
  isNegotiable?: boolean;
  cityId?: number;
  categoryId?: number;
  condition?: string;
  specificationsJson?: string;
  status?: string;
}

export interface ListingResponseDto {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  status?: string;
  condition?: string;
  isFeatured?: boolean;
  cityId?: number;
  categoryId?: number;
  createdAt?: string;
}

export interface ListingResponseDtoPagedResultDto {
  items?: ListingResponseDto[];
  page?: number;
  pageSize?: number;
  totalCount?: number;
}

export interface BlockUserDto {
  isBlocked?: boolean;
  reason?: string;
}

export interface UpdateListingStatusDto {
  status?: string;
  isFeatured?: boolean;
}

export interface UpsertCategoryDto {
  name?: string;
  iconUrl?: string;
  parentCategoryId?: number | null;
}

export interface UpsertStaticPageDto {
  title?: string;
  htmlContent?: string;
}

export interface CreateBannerDto {
  imageUrl?: string;
  linkUrl?: string;
  placementType?: string;
  isActive?: boolean;
}

export interface BannerDto {
  id?: number;
  imageUrl?: string;
  linkUrl?: string;
  placementType?: string;
  isActive?: boolean;
}

export interface AdminDashboardStatsDto {
  totalUsers?: number;
  activeUsers?: number;
  blockedUsers?: number;
  totalProducts?: number;
  activeAds?: number;
  pendingAds?: number;
  rejectedAds?: number;
}

export interface CreateReportDto {
  listingId?: string;
  reason?: string;
  description?: string;
}

export interface CreateReviewDto {
  sellerId?: string;
  rating?: number;
  comment?: string;
}

export interface DeleteConversationDto {
  otherUserId?: string;
  listingId?: string;
}

export interface MessageResponseDto {
  id?: string;
  content?: string;
  sentAt?: string;
  isRead?: boolean;
  senderId?: string;
  senderName?: string;
  receiverId?: string;
}

export interface NotificationDto {
  id?: string;
  message?: string;
  type?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface CountryDto {
  id?: number;
  name?: string;
  code?: string;
}

export interface StateDto {
  id?: number;
  name?: string;
  countryId?: number;
}

export interface CityDto {
  id?: number;
  name?: string;
  stateId?: number;
}

export interface ListingImageDto {
  id?: string;
  url?: string;
  isPrimary?: boolean;
  listingId?: string;
}
