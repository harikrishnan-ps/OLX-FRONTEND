import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  loginForm!: FormGroup;
  showPassword = false;
  serverError: string | null = null;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.serverError = null;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          const user = this.authService.currentUser();
          if (user?.role === 'admin' || user?.role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Login error', err);
          if (err.status === 401) {
            this.serverError = 'Invalid email or password.';
          } else {
            this.serverError = err.error?.message || 'Login failed. Please try again later.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
