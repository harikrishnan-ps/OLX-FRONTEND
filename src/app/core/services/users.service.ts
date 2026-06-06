import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserProfileDto, UpdateProfileDto, ChangePasswordDto } from '../models/api.models';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.http.get<UserProfileDto>(`${environment.apiUrl}/profile`).pipe(
      map(dto => this.mapProfileToUser(dto))
    );
  }

  updateProfile(data: Partial<User>): Observable<User> {
    const dto: UpdateProfileDto = {
      fullName: data.name,
      phoneNumber: data.phone,
      profilePictureUrl: data.avatar
    };
    return this.http.put<UserProfileDto>(`${environment.apiUrl}/profile`, dto).pipe(
      map(dto => this.mapProfileToUser(dto))
    );
  }

  changePassword(data: ChangePasswordDto): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/profile/change-password`, data);
  }

  private mapProfileToUser(dto: UserProfileDto): User {
    return {
      id: dto.id || '',
      name: dto.fullName || '',
      email: dto.email || '',
      phone: dto.phoneNumber || '',
      avatar: dto.profilePictureUrl || '',
      memberSince: dto.createdAt || new Date().toISOString()
    };
  }
}
