const Category = require('../models/Category');

// Get/api/ all categories
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// POST/api/Create a category 
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const slug = name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

    const category = await Category.create({ name, slug, image, description });

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error creating category' });
  }
};


// Delete/api/category/id
exports.deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  await category.deleteOne();

  res.json({ message: 'Category deleted' });
};
