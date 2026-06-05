import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../models/user.model';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private http = inject(HttpClient);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  constructor() {
    const savedUser = localStorage.getItem('olx_user');
    const savedToken = localStorage.getItem('olx_token');
    if (savedUser && savedToken) {
      this._currentUser.set(JSON.parse(savedUser));
      this._token.set(savedToken);
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, {
      identifier: credentials.email,
      password: credentials.password
    }).pipe(
      tap(res => this.handleAuthResponse(res, credentials.rememberMe))
    );
  }

  register(data: RegisterData): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/auth/register`, {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      password: data.password,
      confirmPassword: data.password // Assuming the form pre-validates this
    });
  }

  verifyOtp(email: string, otp: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/verify-otp`, { email, otp }).pipe(
      tap(res => this.handleAuthResponse(res, true))
    );
  }

  resendOtp(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/auth/resend-otp`, { email });
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/auth/forgot-password`, { email });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/auth/reset-password`, {
      email, otp, newPassword
    });
  }

  logout(): void {
    this.http.post(`${environment.apiBaseUrl}/auth/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession() // Clear local session even if server logout fails
    });
  }

  private handleAuthResponse(res: AuthResponse, rememberMe: boolean = false) {
    this._currentUser.set(res.user);
    this._token.set(res.token);

    if (rememberMe) {
      localStorage.setItem('olx_user', JSON.stringify(res.user));
      localStorage.setItem('olx_token', res.token);
    } else {
      sessionStorage.setItem('olx_user', JSON.stringify(res.user));
      sessionStorage.setItem('olx_token', res.token);
    }
  }

  private clearSession(): void {
    this._currentUser.set(null);
    this._token.set(null);
    localStorage.removeItem('olx_user');
    localStorage.removeItem('olx_token');
    sessionStorage.removeItem('olx_user');
    sessionStorage.removeItem('olx_token');
  }

  getToken(): string | null {
    return this._token() || sessionStorage.getItem('olx_token');
  }
}
