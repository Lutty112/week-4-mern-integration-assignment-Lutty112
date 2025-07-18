const express = require('express');
const { body } = require('express-validator');
const {getAllPosts, createPost, getPostById, updatePost, deletePost} = require("../controllers/PostController");
const { protect} = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const router = express.Router();
const upload = require('../middleware/upload');


router.get('/', getAllPosts);
router.get('/:id', getPostById); 

router.post('/',
  protect,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').notEmpty().withMessage('Ingredients field is required'),
    body('steps').notEmpty().withMessage('Steps field is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  validateRequest,
  createPost
);

router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;

