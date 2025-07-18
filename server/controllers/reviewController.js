const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

// Lấy danh sách review (có filter theo status, product, user)
exports.getReviews = async (req, res) => {
    try {
        const { status, product, user } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (product) filter.product = product;
        if (user) filter.user = user;
        const reviews = await Review.find(filter)
            .populate('product', 'name')
            .populate('user', 'name email')
            .sort('-createdAt');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi lấy danh sách review', error: err.message });
    }
};

// Duyệt review (chuyển sang approved)
exports.approveReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        if (!review) return res.status(404).json({ message: 'Không tìm thấy review' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi duyệt review', error: err.message });
    }
};

// Ẩn review (chuyển sang hidden)
exports.hideReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { status: 'hidden' }, { new: true });
        if (!review) return res.status(404).json({ message: 'Không tìm thấy review' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi ẩn review', error: err.message });
    }
};

// Xóa review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Không tìm thấy review' });
        res.json({ message: 'Đã xóa review thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi xóa review', error: err.message });
    }
};

// Thống kê rating cho 1 sản phẩm
exports.getRatingStats = async (req, res) => {
    try {
        const productId = req.params.productId;
        const stats = await Review.aggregate([
            { $match: { product: require('mongoose').Types.ObjectId(productId), status: 'approved' } },
            { $group: { _id: '$rating', count: { $sum: 1 } } }
        ]);
        const total = stats.reduce((sum, s) => sum + s.count, 0);
        const avg = stats.reduce((sum, s) => sum + s._id * s.count, 0) / (total || 1);
        res.json({ stats, total, avg: Number(avg.toFixed(2)) });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi thống kê rating', error: err.message });
    }
}; 