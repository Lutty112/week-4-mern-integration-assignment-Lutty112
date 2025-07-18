const Post = require('../models/Post');

// GET/api/posts/all
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author category');
  res.json(posts);
};

// GET/api/posts/:id — Fetch by MongoDB _id now instead of slug
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author category');

  if (!post) return res.status(404).json({ message: 'Post not found' });

  await post.incrementViewCount();

  res.json(post);
};

// POST/api/posts/
exports.createPost = async (req, res) => {
  try {
    const { title, description, ingredients, steps, cookTime, category, tags } = req.body;

    const image = req.file ? req.file.filename : 'default-recipe.jpg';

    const newPost = new Post({
      title,
      description,
      ingredients,
      steps,
      cookTime,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      image: image,
      author: req.user?._id || null, // Optional author
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({  error: 'Failed to create post'  });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author && post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(post, req.body);
  await post.save();

  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author && post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await post.deleteOne();

  res.json({ message: 'Post deleted' });
};
