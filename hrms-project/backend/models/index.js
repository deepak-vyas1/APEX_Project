const User = require('./User');
const Employee = require('./Employee');
const Leave = require('./Leave');
const Attendance = require('./Attendance');
const Payroll = require('./Payroll');

// Define associations
User.hasOne(Employee, { foreignKey: 'userId' });
Employee.belongsTo(User, { foreignKey: 'userId' });

Employee.hasMany(Leave, { foreignKey: 'employeeId' });
Leave.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(Attendance, { foreignKey: 'employeeId' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(Payroll, { foreignKey: 'employeeId' });
Payroll.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = {
  User,
  Employee,
  Leave,
  Attendance,
  Payroll
};