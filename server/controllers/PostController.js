const Post = require('../models/Post');

// GET/api/posts/all
exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author category');
  res.json(posts);
};

// Get/api/posts/single post by slug
exports.getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author category');

  if (!post) return res.status(404).json({ message: 'Post not found' });

  // Increment view count
  await post.incrementViewCount();

  res.json(post);
};

// POST/api/Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description, ingredients, steps, cookTime, category, tags } = req.body;
    const slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    const author = req.user._id;
    const featuredImage = req.file ? req.file.filename : 'default.jpg';

    const newPost = await Post.create({
      title,
      description,
      ingredients,
      steps,
      cookTime,
      category,
      slug,
      tags,
      author,
      featuredImage,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// PUT/api/Update a post by id
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(post, req.body);

  await post.save();

  res.json(post);
};

// Delete/api/post/id
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await post.deleteOne();

  res.json({ message: 'Post deleted' });
};

