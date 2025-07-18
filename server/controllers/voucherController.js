const Voucher = require('../models/Voucher');

// Get all vouchers
exports.getVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find()
            .populate('applicableProducts', 'name')
            .sort('-createdAt');
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vouchers', error: error.message });
    }
};

// Get single voucher
exports.getVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id)
            .populate('applicableProducts', 'name');

        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.json(voucher);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching voucher', error: error.message });
    }
};

// Create voucher
exports.createVoucher = async (req, res) => {
    try {
        const voucher = new Voucher({
            ...req.body,
            createdBy: req.user.userId
        });

        await voucher.save();
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ message: 'Error creating voucher', error: error.message });
    }
};

// Update voucher
exports.updateVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.json(voucher);
    } catch (error) {
        res.status(500).json({ message: 'Error updating voucher', error: error.message });
    }
};

// Delete voucher
exports.deleteVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);

        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        res.json({ message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting voucher', error: error.message });
    }
};

// Validate and apply voucher
exports.validateVoucher = async (req, res) => {
    try {
        const { code, orderValue, productIds } = req.body;

        const voucher = await Voucher.findOne({ code });

        if (!voucher) {
            return res.status(404).json({ message: 'Voucher not found' });
        }

        // Kiểm tra thời hạn
        const now = new Date();
        if (now < voucher.startDate || now > voucher.endDate) {
            return res.status(400).json({ message: 'Voucher is not valid at this time' });
        }

        // Kiểm tra trạng thái
        if (voucher.status !== 'active') {
            return res.status(400).json({ message: 'Voucher is not active' });
        }

        // Kiểm tra giới hạn sử dụng
        if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
            return res.status(400).json({ message: 'Voucher has reached its usage limit' });
        }

        // Kiểm tra giá trị đơn hàng tối thiểu
        if (orderValue < voucher.minOrderValue) {
            return res.status(400).json({
                message: `Order value must be at least ${voucher.minOrderValue}`
            });
        }

        // Kiểm tra sản phẩm áp dụng
        if (voucher.applicableProducts.length > 0) {
            const validProducts = productIds.every(id =>
                voucher.applicableProducts.includes(id)
            );
            if (!validProducts) {
                return res.status(400).json({ message: 'Voucher is not applicable to some products' });
            }
        }

        // Tính toán giá trị giảm giá
        let discount = 0;
        if (voucher.type === 'percentage') {
            discount = (orderValue * voucher.value) / 100;
            if (voucher.maxDiscount) {
                discount = Math.min(discount, voucher.maxDiscount);
            }
        } else {
            discount = voucher.value;
        }

        res.json({
            voucher,
            discount,
            finalAmount: orderValue - discount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error validating voucher', error: error.message });
    }
}; 