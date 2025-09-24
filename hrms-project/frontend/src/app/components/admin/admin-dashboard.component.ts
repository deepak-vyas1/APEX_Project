import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { LeaveService } from '../../services/leave.service';
import { AttendanceService } from '../../services/attendance.service';
import { Employee, Leave, Attendance } from '../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Admin Dashboard
            </h1>
            <p class="text-gray-600 text-lg">Manage your organization's HR operations with ease</p>
          </div>
          <div class="hidden md:block">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <mat-icon class="text-white text-4xl">dashboard</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-blue-400" 
             (click)="router.navigate(['/employees'])">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium mb-1">Total Employees</p>
              <p class="text-3xl font-bold mb-2">{{ totalEmployees }}</p>
              <p class="text-blue-200 text-xs">Click to manage →</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
              <mat-icon class="text-2xl">people</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-green-400" 
             (click)="router.navigate(['/leaves'])">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium mb-1">Pending Leaves</p>
              <p class="text-3xl font-bold mb-2">{{ pendingLeaves }}</p>
              <p class="text-green-200 text-xs">Click to review →</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
              <mat-icon class="text-2xl">event_available</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-purple-400" 
             (click)="router.navigate(['/attendance'])">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium mb-1">Present Today</p>
              <p class="text-3xl font-bold mb-2">{{ presentToday }}</p>
              <p class="text-purple-200 text-xs">Click to view →</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
              <mat-icon class="text-2xl">check_circle</mat-icon>
            </div>
          </div>
        </div>

        <div class="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-orange-400" 
             (click)="router.navigate(['/employees'])">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-100 text-sm font-medium mb-1">Active Employees</p>
              <p class="text-3xl font-bold mb-2">{{ activeEmployees }}</p>
              <p class="text-orange-200 text-xs">Click to manage →</p>
            </div>
            <div class="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
              <mat-icon class="text-2xl">person_check</mat-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
              <mat-icon class="text-white text-xl">flash_on</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Quick Actions</h2>
          </div>
          <div class="space-y-4">
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="router.navigate(['/employees'])">
              <mat-icon class="mr-2">person_add</mat-icon>
              Manage Employees
            </button>
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="router.navigate(['/leaves'])">
              <mat-icon class="mr-2">approval</mat-icon>
              Review Leave Requests
            </button>
            <button mat-raised-button 
                    class="w-full h-14 text-lg font-medium bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200" 
                    (click)="router.navigate(['/payroll'])">
              <mat-icon class="mr-2">payment</mat-icon>
              Generate Payroll
            </button>
          </div>
        </div>

        <!-- Recent Leave Requests -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="flex items-center mb-6">
            <div class="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl mr-4">
              <mat-icon class="text-white text-xl">schedule</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Recent Leave Requests</h2>
          </div>
          <div class="space-y-4">
            <div *ngFor="let leave of recentLeaves" 
                 class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <p class="font-semibold text-gray-800 mb-1">
                    {{ leave.Employee?.firstName }} {{ leave.Employee?.lastName }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <mat-icon class="text-xs mr-1">event</mat-icon>
                    {{ leave.leaveType }} - {{ leave.startDate }}
                  </p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-medium" 
                      [ngClass]="{
                        'bg-yellow-100 text-yellow-800 border border-yellow-200': leave.status === 'pending',
                        'bg-green-100 text-green-800 border border-green-200': leave.status === 'approved',
                        'bg-red-100 text-red-800 border border-red-200': leave.status === 'rejected'
                      }">
                  {{ leave.status | titlecase }}
                </span>
              </div>
            </div>
            <div *ngIf="recentLeaves.length === 0" class="text-center py-8 text-gray-500">
              <mat-icon class="text-4xl mb-2">inbox</mat-icon>
              <p>No recent leave requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  totalEmployees = 0;
  activeEmployees = 0;
  pendingLeaves = 0;
  presentToday = 0;
  recentLeaves: Leave[] = [];

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService,
    private attendanceService: AttendanceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.totalEmployees = employees.length;
      this.activeEmployees = employees.filter(e => e.isActive).length;
    });

    this.leaveService.getAllLeaves().subscribe(leaves => {
      this.pendingLeaves = leaves.filter(l => l.status === 'pending').length;
      this.recentLeaves = leaves.slice(0, 5);
    });

    this.attendanceService.getAllAttendance().subscribe(attendance => {
      const today = new Date().toDateString();
      this.presentToday = attendance.filter(a => 
        new Date(a.date).toDateString() === today
      ).length;
    });
  }
}