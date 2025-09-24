const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { auth, adminAuth } = require('../middleware/auth');

router.get('/', auth, leaveController.getAllLeaves);
router.get('/my-leaves', auth, leaveController.getMyLeaves);
router.post('/', auth, leaveController.applyLeave);
router.put('/:id/approve', auth, adminAuth, leaveController.approveLeave);
router.put('/:id/reject', auth, adminAuth, leaveController.rejectLeave);

module.exports = router;