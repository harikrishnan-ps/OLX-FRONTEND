import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verify-otp',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verify-otp.html',
  styleUrl: '../login-page/login-page.scss', // Reusing auth styles
  standalone: true
})
export class VerifyOtpPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  verifyForm!: FormGroup;
  email: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    if (!this.email) {
      this.router.navigate(['/auth/login']);
    }

    this.verifyForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.verifyForm.valid) {
      this.authService.verifyOtp(this.email, this.verifyForm.value.otp).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid OTP. Please try again.';
          console.error('Verify error', err);
        }
      });
    } else {
      this.verifyForm.markAllAsTouched();
    }
  }

  resendOtp(): void {
    this.authService.resendOtp(this.email).subscribe({
      next: () => {
        alert('OTP resent to your email.');
      },
      error: (err) => {
        this.errorMessage = 'Failed to resend OTP.';
      }
    });
  }
}
