const express = require('express');
const { 
    getAllCategories, 
    getAdminCategories, 
    getCategoryDetails, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/categories').get(getAllCategories);
router.route('/admin/categories').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategories);
router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);
router.route('/admin/category/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), getCategoryDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;

