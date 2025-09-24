import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { User, Attendance, Leave } from '../../models/user.model';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Welcome, {{ currentUser?.employee?.firstName }} {{ currentUser?.employee?.lastName }}!
            </h1>
            <p class="text-gray-600 text-lg">{{ currentUser?.employee?.position }} - {{ currentUser?.employee?.department }}</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-full">
              <mat-icon class="text-white text-4xl">person</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium mb-1">Today's Status</p>
              <p class="text-3xl font-bold mb-2">{{ todayAttendance ? 'Present' : 'Absent' }}</p>
              <p class="text-blue-200 text-xs">{{ todayAttendance?.checkIn || 'Not checked in' }}</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl">
              <mat-icon class="text-2xl">access_time</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium mb-1">Pending Leaves</p>
              <p class="text-3xl font-bold mb-2">{{ pendingLeaves }}</p>
              <p class="text-green-200 text-xs">Awaiting approval</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl">
              <mat-icon class="text-2xl">event_available</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium mb-1">This Month</p>
              <p class="text-3xl font-bold mb-2">{{ monthlyAttendance }}</p>
              <p class="text-purple-200 text-xs">Days present</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl">
              <mat-icon class="text-2xl">calendar_today</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium mb-1">Total Hours</p>
              <p class="text-3xl font-bold mb-2">{{ totalHours }}h</p>
              <p class="text-orange-200 text-xs">This month</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl">
              <mat-icon class="text-2xl">schedule</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl mr-4">
              <mat-icon class="text-white text-xl">flash_on</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          <div class="space-y-4">
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="openCheckInDialog()" [disabled]="todayAttendance && !todayAttendance.checkOut">
              <mat-icon class="mr-2">login</mat-icon>
              Check In
            </button>
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="openCheckOutDialog()" [disabled]="!todayAttendance || todayAttendance.checkOut">
              <mat-icon class="mr-2">logout</mat-icon>
              Check Out
            </button>
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="router.navigate(['/leaves'])">
              <mat-icon class="mr-2">event</mat-icon>
              Apply Leave
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl mr-4">
              <mat-icon class="text-white text-xl">history</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div class="space-y-4">
            <div *ngFor="let attendance of recentAttendance" 
                 class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200">
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <p class="font-semibold text-gray-800 mb-1">
                    {{ attendance.date | date:'mediumDate' }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <mat-icon class="text-xs mr-1">schedule</mat-icon>
                    {{ attendance.checkIn }} - {{ attendance.checkOut || 'Ongoing' }}
                  </p>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  {{ attendance.workingHours }}h
                </span>
              </div>
            </div>
            <div *ngIf="recentAttendance.length === 0" class="text-center py-8 text-gray-500">
              <mat-icon class="text-4xl mb-2">schedule</mat-icon>
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  todayAttendance: Attendance | null = null;
  recentAttendance: Attendance[] = [];
  pendingLeaves = 0;
  monthlyAttendance = 0;
  totalHours = 0;

  constructor(
    private authService: AuthService,
    private attendanceService: AttendanceService,
    private leaveService: LeaveService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.attendanceService.getMyAttendance().subscribe(attendance => {
      this.recentAttendance = attendance.slice(0, 5);
      this.todayAttendance = attendance.find(a => 
        new Date(a.date).toDateString() === new Date().toDateString()
      ) || null;
      this.monthlyAttendance = attendance.filter(a => 
        new Date(a.date).getMonth() === new Date().getMonth()
      ).length;
      this.totalHours = attendance.reduce((sum, a) => sum + a.workingHours, 0);
    });

    this.leaveService.getMyLeaves().subscribe(leaves => {
      this.pendingLeaves = leaves.filter(l => l.status === 'pending').length;
    });
  }

  openCheckInDialog(): void {
    const dialogRef = this.dialog.open(CheckInDialogComponent, {
      width: '400px',
      data: { employee: this.currentUser?.employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attendanceService.checkIn().subscribe({
          next: () => {
            this.snackBar.open('Successfully checked in!', 'Close', { duration: 3000 });
            this.loadDashboardData();
          },
          error: () => {
            this.snackBar.open('Check-in failed', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openCheckOutDialog(): void {
    const dialogRef = this.dialog.open(CheckOutDialogComponent, {
      width: '400px',
      data: { 
        employee: this.currentUser?.employee,
        checkInTime: this.todayAttendance?.checkIn
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attendanceService.checkOut().subscribe({
          next: () => {
            this.snackBar.open('Successfully checked out!', 'Close', { duration: 3000 });
            this.loadDashboardData();
          },
          error: () => {
            this.snackBar.open('Check-out failed', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-check-in-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6">
      <div class="text-center mb-6">
        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
          <mat-icon class="text-white text-4xl">login</mat-icon>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Check In</h2>
        <p class="text-gray-600">{{ getCurrentTime() }}</p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600">Employee:</span>
          <span class="font-semibold">{{ data.employee?.firstName }} {{ data.employee?.lastName }}</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600">Employee ID:</span>
          <span class="font-semibold">{{ data.employee?.employeeId }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-600">Department:</span>
          <span class="font-semibold">{{ data.employee?.department }}</span>
        </div>
      </div>

      <div class="flex space-x-3">
        <button mat-button class="flex-1" mat-dialog-close>Cancel</button>
        <button mat-raised-button 
                class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white" 
                [mat-dialog-close]="true">
          Confirm Check In
        </button>
      </div>
    </div>
  `
})
export class CheckInDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}

@Component({
  selector: 'app-check-out-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-6">
      <div class="text-center mb-6">
        <div class="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
          <mat-icon class="text-white text-4xl">logout</mat-icon>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Check Out</h2>
        <p class="text-gray-600">{{ getCurrentTime() }}</p>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600">Employee:</span>
          <span class="font-semibold">{{ data.employee?.firstName }} {{ data.employee?.lastName }}</span>
        </div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-gray-600">Check In Time:</span>
          <span class="font-semibold">{{ data.checkInTime }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-gray-600">Working Hours:</span>
          <span class="font-semibold">{{ getWorkingHours() }}</span>
        </div>
      </div>

      <div class="flex space-x-3">
        <button mat-button class="flex-1" mat-dialog-close>Cancel</button>
        <button mat-raised-button 
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white" 
                [mat-dialog-close]="true">
          Confirm Check Out
        </button>
      </div>
    </div>
  `
})
export class CheckOutDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  
  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
  
  getWorkingHours(): string {
    if (!this.data.checkInTime) return '0h';
    const checkIn = new Date(`1970-01-01T${this.data.checkInTime}`);
    const now = new Date();
    const currentTime = new Date(`1970-01-01T${now.toTimeString().split(' ')[0]}`);
    const diff = (currentTime.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    return `${Math.max(0, diff).toFixed(1)}h`;
  }
}