const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        unique: true,
        trim: true
    },
    icon: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    hasSubcategories: {
        type: Boolean,
        default: false
    },
    subcategories: [
        {
            name: {
                type: String,
                required: true
            },
            items: [{
                type: String
            }]
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categorySchema);

