const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true }, 
    steps: { type: String, required: true },        
    cookTime: { type: Number, required: true },
    image: {type: String, default: 'default-recipe.jpg'},
    slug: {type: String, required: true, unique: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
    viewCount: {type: Number, default: 0},
    comments: [
      {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        content: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
      },
    ],
  },
  { timestamps: true }
);


// Generate slug from title
PostSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();

  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  next();
});

// Virtual URL
PostSchema.virtual('url').get(function () {
  return `/posts/${this.slug}`;
});

// Add comment method
PostSchema.methods.addComment = function (userId, content) {
  this.comments.push({ user: userId, content });
  return this.save();
};

// Increment view count method
PostSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save();
};

module.exports = mongoose.model('Post', PostSchema);
