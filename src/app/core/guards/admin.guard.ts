import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (authService.isAuthenticated() && (user?.role === 'admin' || user?.role === 'Admin')) {
    return true;
  }

  // If authenticated but not admin, redirect to home. If not authenticated, redirect to login.
  if (authService.isAuthenticated()) {
    router.navigate(['/']);
  } else {
    router.navigate(['/auth/login']);
  }
  
  return false;
};
