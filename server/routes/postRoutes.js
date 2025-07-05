const express = require('express');
const { body } = require('express-validator');
const {getAllPosts, getPostBySlug, createPost, updatePost, deletePost} = require("../controllers/PostController");
const { protect} = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const router = express.Router();
const upload = require('../middleware/upload');


router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect,
  upload.single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').notEmpty().withMessage('Ingredients field is required'),
    body('steps').notEmpty().withMessage('Steps field is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('author').notEmpty().withMessage('Author is required'),
  ],
  validateRequest, createPost);

router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/', protect, upload.single('featuredImage'), createPost);

module.exports = router;

