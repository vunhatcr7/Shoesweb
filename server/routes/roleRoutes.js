const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const roleController = require('../controllers/roleController');

// Lấy danh sách, tạo mới
router.route('/')
    .get(protect, admin, roleController.getRoles)
    .post(protect, admin, roleController.createRole);

// Lấy, sửa, xóa 1 role
router.route('/:id')
    .get(protect, admin, roleController.getRole)
    .put(protect, admin, roleController.updateRole)
    .delete(protect, admin, roleController.deleteRole);

module.exports = router; 