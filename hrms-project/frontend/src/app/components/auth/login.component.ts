import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 overflow-hidden">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-6">
          <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <mat-icon class="text-blue-600 text-3xl">business</mat-icon>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">HRMS Login</h1>
          <p class="text-blue-100">Welcome back!</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-2xl shadow-2xl p-6">
          <div class="text-center mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-2">Sign In</h2>
            <div class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field class="w-full" appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-icon matSuffix class="text-gray-500">email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field class="w-full" appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button" class="text-gray-500">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button mat-raised-button 
                    type="submit" 
                    class="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                    [disabled]="loginForm.invalid || loading">
              <mat-icon *ngIf="loading" class="animate-spin mr-2">refresh</mat-icon>
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <!-- Quick Login -->
          <div class="mt-6">
            <div class="text-center text-gray-500 text-sm mb-3">Quick Login</div>
            <div class="grid grid-cols-2 gap-3">
              <button mat-stroked-button 
                      (click)="quickLogin('admin')" 
                      class="h-10 border-2 border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                <mat-icon class="mr-1 text-sm">admin_panel_settings</mat-icon>
                Admin
              </button>
              <button mat-stroked-button 
                      (click)="quickLogin('employee')" 
                      class="h-10 border-2 border-green-300 text-green-600 hover:bg-green-50 rounded-lg font-medium">
                <mat-icon class="mr-1 text-sm">person</mat-icon>
                Employee
              </button>
            </div>
          </div>

          <!-- Demo Info -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-xs font-bold text-gray-700 mb-3 flex items-center">
              <mat-icon class="text-blue-600 mr-1 text-sm">info</mat-icon>
              Demo Accounts
            </h3>
            <div class="space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-gray-600">Admin:</span>
                <span class="font-mono text-blue-600">admin&#64;company.com</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Employee:</span>
                <span class="font-mono text-green-600">john.doe&#64;company.com</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Password:</span>
                <span class="font-mono text-purple-600">password123</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-4 text-blue-100 text-xs">
          <p>&copy; 2024 HRMS. All rights reserved.</p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  quickLogin(type: 'admin' | 'employee'): void {
    const credentials = {
      admin: { email: 'admin@company.com', password: 'password123' },
      employee: { email: 'john.doe@company.com', password: 'password123' }
    };
    
    this.loginForm.patchValue(credentials[type]);
    this.onSubmit();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Welcome back!', 'Close', { duration: 2000 });
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(error.error.message || 'Login failed', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}