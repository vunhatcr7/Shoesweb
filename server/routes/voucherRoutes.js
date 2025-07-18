const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getVouchers,
    getVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    validateVoucher
} = require('../controllers/voucherController');

// Admin routes
router.route('/')
    .get(protect, admin, getVouchers)
    .post(protect, admin, createVoucher);

router.route('/:id')
    .get(protect, admin, getVoucher)
    .put(protect, admin, updateVoucher)
    .delete(protect, admin, deleteVoucher);

// Public route for validating vouchers
router.post('/validate', protect, validateVoucher);

module.exports = router; 