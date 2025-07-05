const express = require('express');
const {getAllCategories, createCategory, deleteCategory} = require("../controllers/CategoryController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();


router.get('/', getAllCategories);
router.post('/', protect, authorize(['admin', 'user']), createCategory);
router.delete('/:id', protect, authorize(['admin', 'user']), deleteCategory);

module.exports = router;
