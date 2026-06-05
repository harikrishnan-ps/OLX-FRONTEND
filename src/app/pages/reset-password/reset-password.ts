import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: '../login-page/login-page.scss',
  standalone: true
})
export class ResetPasswordPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  resetForm!: FormGroup;
  email: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    if (!this.email) {
      this.router.navigate(['/auth/forgot-password']);
    }

    this.resetForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const { otp, newPassword } = this.resetForm.value;
      this.authService.resetPassword(this.email, otp, newPassword).subscribe({
        next: () => {
          alert('Password successfully reset. Please log in.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to reset password. The OTP might be invalid or expired.';
          console.error(err);
        }
      });
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
