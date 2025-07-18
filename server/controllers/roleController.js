const Role = require('../models/Role');

// Lấy danh sách role
exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort('name');
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi lấy danh sách vai trò', error: err.message });
    }
};

// Lấy 1 role
exports.getRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) return res.status(404).json({ message: 'Không tìm thấy vai trò' });
        res.json(role);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi lấy vai trò', error: err.message });
    }
};

// Tạo role mới
exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = new Role({ name, permissions });
        await role.save();
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi tạo vai trò', error: err.message });
    }
};

// Sửa role
exports.updateRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { name, permissions },
            { new: true, runValidators: true }
        );
        if (!role) return res.status(404).json({ message: 'Không tìm thấy vai trò' });
        res.json(role);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi cập nhật vai trò', error: err.message });
    }
};

// Xóa role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) return res.status(404).json({ message: 'Không tìm thấy vai trò' });
        res.json({ message: 'Đã xóa vai trò thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi xóa vai trò', error: err.message });
    }
}; 