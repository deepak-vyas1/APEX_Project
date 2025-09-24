const { Leave, Employee } = require('../models');

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      include: [{ model: Employee, attributes: ['firstName', 'lastName', 'employeeId'] }]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { userId: req.user.id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    const leaves = await Leave.findAll({
      where: { employeeId: employee.id },
      include: [{ model: Employee, attributes: ['firstName', 'lastName', 'employeeId'] }]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const applyLeave = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { userId: req.user.id } });
    if (!employee) {
      return res.status(404).json({ message: 'Employee profile not found' });
    }

    const { leaveType, startDate, endDate, reason } = req.body;

    const leave = await Leave.create({
      employeeId: employee.id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    await leave.update({
      status: 'approved',
      approvedBy: req.user.id,
      approvedAt: new Date()
    });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    await leave.update({
      status: 'rejected',
      approvedBy: req.user.id,
      approvedAt: new Date()
    });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllLeaves,
  getMyLeaves,
  applyLeave,
  approveLeave,
  rejectLeave
};