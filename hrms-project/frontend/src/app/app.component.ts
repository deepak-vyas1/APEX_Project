import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <mat-toolbar color="primary" *ngIf="authService.isLoggedIn()" class="navbar-container">
        <!-- Left: Logo -->
        <div class="navbar-left">
          <a routerLink="/admin" class="cursor-pointer hover:text-blue-200 text-xl font-bold text-white no-underline">HRMS</a>
        </div>
        
        <!-- Center: Navigation -->
        <div class="navbar-center">
          <button mat-button routerLink="/dashboard" routerLinkActive="active-nav-item" class="nav-item">Dashboard</button>
          <button mat-button routerLink="/leaves" routerLinkActive="active-nav-item" class="nav-item">Leaves</button>
          <button mat-button routerLink="/attendance" routerLinkActive="active-nav-item" class="nav-item">Attendance</button>
          <button mat-button routerLink="/payroll" routerLinkActive="active-nav-item" class="nav-item">Payroll</button>
          <button mat-button routerLink="/admin" routerLinkActive="active-nav-item" class="nav-item" *ngIf="authService.isAdmin()">Admin</button>
          <button mat-button routerLink="/employees" routerLinkActive="active-nav-item" class="nav-item" *ngIf="authService.isAdmin()">Employees</button>
        </div>
        
        <!-- Right: User Info & Logout -->
        <div class="navbar-right">
          <span class="user-info">
            <mat-icon class="user-icon">{{ authService.isAdmin() ? 'admin_panel_settings' : 'person' }}</mat-icon>
            <span class="user-role">{{ authService.isAdmin() ? 'Admin' : 'Employee' }}</span>
          </span>
          <button mat-icon-button [matMenuTriggerFor]="menu" class="logout-btn">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>
      <main class="container mx-auto p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
    }
    
    .navbar-left {
      flex: 0 0 auto;
    }
    
    .navbar-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .navbar-right {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .nav-item {
      margin: 0 4px;
      transition: all 0.3s ease;
    }
    
    .active-nav-item {
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
      transform: scale(1.05);
    }
    
    .nav-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      color: white;
      font-size: 14px;
      font-weight: 500;
    }
    
    .user-icon {
      margin-right: 8px;
      font-size: 18px;
    }
    
    .user-role {
      margin-right: 8px;
    }
    
    .logout-btn {
      color: white;
    }
  `]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToHome(): void {
    this.router.navigate(['/dashboard']);
  }
}