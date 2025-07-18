const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['running', 'basketball', 'lifestyle', 'training', 'soccer', 'golf']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        required: true
    }],
    sizes: [{
        size: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    colors: [{
        name: String,
        code: String
    }],
    features: [String],
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 