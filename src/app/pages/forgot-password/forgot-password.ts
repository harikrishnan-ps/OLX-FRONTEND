import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: '../login-page/login-page.scss',
  standalone: true
})
export class ForgotPasswordPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  forgotForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
        next: () => {
          this.successMessage = 'A password reset OTP has been sent to your email.';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/auth/reset-password'], { queryParams: { email: this.forgotForm.value.email } });
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to send password reset email. Please try again.';
          this.successMessage = '';
          console.error(err);
        }
      });
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }
}
