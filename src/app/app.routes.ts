import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
    title: 'OLX — Buy & Sell Near You',
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-results/search-results').then(m => m.SearchResults),
    title: 'Search Results — OLX',
  },
  {
    path: 'category/:slug',
    loadComponent: () => import('./pages/category-page-cars/category-page-cars').then(m => m.CategoryPageCars),
    title: 'Category — OLX',
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails),
    title: 'Product Details — OLX',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage),
    title: 'Login — OLX',
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/registration-page/registration-page').then(m => m.RegistrationPage),
    title: 'Create Account — OLX',
  },
  {
    path: 'auth/verify-otp',
    loadComponent: () => import('./pages/verify-otp/verify-otp').then(m => m.VerifyOtpPage),
    title: 'Verify Account — OLX',
  },
  {
    path: 'auth/forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then(m => m.ForgotPasswordPage),
    title: 'Forgot Password — OLX',
  },
  {
    path: 'auth/reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password').then(m => m.ResetPasswordPage),
    title: 'Reset Password — OLX',
  },
  {
    path: 'post-ad',
    loadComponent: () => import('./pages/post-an-ad/post-an-ad').then(m => m.PostAnAd),
    title: 'Post an Ad — OLX',
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat-interface/chat-interface').then(m => m.ChatInterface),
    title: 'Chat — OLX',
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications-page/notifications-page').then(m => m.NotificationsPage),
    title: 'Notifications — OLX',
  },
  {
    path: 'favourites',
    loadComponent: () => import('./pages/favourites-page/favourites-page').then(m => m.FavouritesPage),
    title: 'Favourites — OLX',
  },
  {
    path: 'my-ads',
    loadComponent: () => import('./pages/my-ads-dashboard/my-ads-dashboard').then(m => m.MyAdsDashboard),
    title: 'My Ads — OLX',
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/user-profile/user-profile').then(m => m.UserProfile),
    title: 'Profile — OLX',
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard), title: 'Admin Dashboard' },
      { path: 'users', loadComponent: () => import('./pages/admin/admin-users/admin-users').then(m => m.AdminUsers), title: 'Manage Users' },
      { path: 'listings', loadComponent: () => import('./pages/admin/admin-listings/admin-listings').then(m => m.AdminListings), title: 'Manage Listings' },
      { path: 'categories', loadComponent: () => import('./pages/admin/admin-categories/admin-categories').then(m => m.AdminCategories), title: 'Manage Categories' },
      { path: 'reports', loadComponent: () => import('./pages/admin/admin-reports/admin-reports').then(m => m.AdminReports), title: 'Manage Reports' }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found-page/not-found-page').then(m => m.NotFoundPage),
    title: 'Page Not Found — OLX',
  },
];
