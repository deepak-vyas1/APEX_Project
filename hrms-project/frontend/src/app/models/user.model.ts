export interface User {
  id: number;
  email: string;
  role: 'admin' | 'employee';
  employee?: Employee;
}

export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  userId: number;
}

export interface Leave {
  id: number;
  employeeId: number;
  leaveType: 'sick' | 'casual' | 'annual' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  Employee?: Employee;
}

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut?: string;
  workingHours: number;
  status: 'present' | 'absent' | 'half-day';
  Employee?: Employee;
}

export interface Payroll {
  id: number;
  employeeId: number;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  workingDays: number;
  presentDays: number;
  Employee?: Employee;
}