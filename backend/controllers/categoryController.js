const Category = require('../models/categoryModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Categories
exports.getAllCategories = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });

    res.status(200).json({
        success: true,
        categories
    });
});

// Get All Categories ---ADMIN
exports.getAdminCategories = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find().sort({ displayOrder: 1 });

    res.status(200).json({
        success: true,
        categories
    });
});

// Get Single Category
exports.getCategoryDetails = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    res.status(200).json({
        success: true,
        category
    });
});

// Create Category ---ADMIN
exports.createCategory = asyncErrorHandler(async (req, res, next) => {
    let icon = {};

    if (req.body.icon && req.body.icon.trim() !== '') {
        try {
            const result = await cloudinary.v2.uploader.upload(req.body.icon, {
                folder: "categories",
            });

            icon = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        } catch (error) {
            // If icon upload fails, continue without icon
            console.error("Icon upload error:", error);
        }
    }

    req.body.icon = icon;

    // Parse subcategories if provided
    if (req.body.subcategories && typeof req.body.subcategories === 'string') {
        req.body.subcategories = JSON.parse(req.body.subcategories);
    }

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category
    });
});

// Update Category ---ADMIN
exports.updateCategory = asyncErrorHandler(async (req, res, next) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    if (req.body.icon && req.body.icon !== category.icon.url) {
        // Delete old icon
        if (category.icon.public_id) {
            await cloudinary.v2.uploader.destroy(category.icon.public_id);
        }

        // Upload new icon
        const result = await cloudinary.v2.uploader.upload(req.body.icon, {
            folder: "categories",
        });

        req.body.icon = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    } else {
        req.body.icon = category.icon;
    }

    // Parse subcategories if provided
    if (req.body.subcategories && typeof req.body.subcategories === 'string') {
        req.body.subcategories = JSON.parse(req.body.subcategories);
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        category
    });
});

// Delete Category ---ADMIN
exports.deleteCategory = asyncErrorHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    // Delete icon from cloudinary
    if (category.icon.public_id) {
        await cloudinary.v2.uploader.destroy(category.icon.public_id);
    }

    await category.remove();

    res.status(200).json({
        success: true,
        message: "Category Deleted Successfully"
    });
});

