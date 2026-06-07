import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { RegisterDto, LoginDto, AuthResponseDto, UserDto } from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _currentUser = signal<UserDto | null>(null);
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

  login(credentials: LoginCredentials): Observable<AuthResponseDto> {
    const loginDto: LoginDto = {
      identifier: credentials.email,
      password: credentials.password
    };
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/login`, loginDto).pipe(
      tap(res => this.handleAuthResponse(res, credentials.rememberMe))
    );
  }

  register(data: RegisterData): Observable<void> {
    const registerDto: RegisterDto = {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      password: data.password,
      confirmPassword: data.password // Assuming the form pre-validates this
    };
    return this.http.post<void>(`${environment.apiUrl}/auth/register`, registerDto);
  }

  verifyOtp(email: string, otp: string): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${environment.apiUrl}/auth/verify-otp`, { email, otp }).pipe(
      tap(res => this.handleAuthResponse(res, true))
    );
  }

  resendOtp(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/resend-otp`, { email });
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, {
      email, otp, newPassword
    });
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession() // Clear local session even if server logout fails
    });
  }

  private handleAuthResponse(res: AuthResponseDto, rememberMe: boolean = false) {
    const user = {
      email: res.email,
      fullName: res.fullName,
      role: res.role
    };

    if (res.email) {
      this._currentUser.set(user);
    }
    if (res.token) {
      this._token.set(res.token);
    }

    if (rememberMe) {
      if (res.email) localStorage.setItem('olx_user', JSON.stringify(user));
      if (res.token) localStorage.setItem('olx_token', res.token);
    } else {
      if (res.email) sessionStorage.setItem('olx_user', JSON.stringify(user));
      if (res.token) sessionStorage.setItem('olx_token', res.token);
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
