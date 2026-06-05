import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registration-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: '../login-page/login-page.scss', // Reusing login styles for consistency
})
export class RegistrationPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  registerForm!: FormGroup;
  showPassword = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/verify-otp'], { queryParams: { email: this.registerForm.value.email } });
        },
        error: (err) => {
          console.error('Registration error', err);
          // TODO: handle error in UI
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
