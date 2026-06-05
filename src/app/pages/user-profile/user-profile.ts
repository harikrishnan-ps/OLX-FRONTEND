import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-with-navbar-and-bottom-nav bg-gray">
      <div class="container section-padding">
        <h1 class="text-headline-md mb-4">Edit Profile</h1>
        
        <div class="profile-card">
          @if (isLoading) {
            <p>Loading profile...</p>
          } @else if (profile) {
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
              <div class="avatar-section mb-4">
                <div class="avatar-circle">
                  <span class="material-symbols-outlined">person</span>
                </div>
                <button type="button" class="btn-text">Change Photo</button>
              </div>

              <div class="form-group mb-3">
                <label>Name</label>
                <input type="text" class="form-input" formControlName="name">
              </div>

              <div class="form-group mb-3">
                <label>Email</label>
                <input type="email" class="form-input" formControlName="email">
              </div>

              <div class="form-group mb-4">
                <label>Phone</label>
                <input type="text" class="form-input" formControlName="phone">
              </div>

              <button type="submit" class="btn-primary" [disabled]="!profileForm.valid || isSaving">
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-gray { background-color: var(--color-background); min-height: 100vh; }
    .profile-card { background: var(--color-surface); padding: 24px; border-radius: 8px; max-width: 600px; }
    .avatar-section { display: flex; align-items: center; gap: 16px; }
    .avatar-circle { width: 80px; height: 80px; border-radius: 50%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; }
    .avatar-circle span { font-size: 40px; color: #757575; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; }
    .form-input { width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: 4px; }
  `]
})
export class UserProfile implements OnInit {
  usersService = inject(UsersService);
  fb = inject(FormBuilder);

  profile: any = null;
  isLoading = true;
  isSaving = false;
  profileForm!: FormGroup;

  ngOnInit() {
    this.usersService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.initForm();
        this.isLoading = false;
      },
      error: () => {
        // Mock data
        this.profile = { name: 'John Doe', email: 'john@example.com', phone: '1234567890' };
        this.initForm();
        this.isLoading = false;
      }
    });
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [this.profile.name],
      email: [this.profile.email],
      phone: [this.profile.phone]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.usersService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.isSaving = false;
          alert('Profile updated');
        },
        error: () => {
          this.isSaving = false;
          alert('Profile updated (mock)');
        }
      });
    }
  }
}
