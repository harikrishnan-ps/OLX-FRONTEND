import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/profile`);
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiBaseUrl}/profile`, data);
  }

  changePassword(data: any): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/profile/change-password`, data);
  }
}
