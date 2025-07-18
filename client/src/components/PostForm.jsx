import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { categoryService } from '../services/api';
import axios from 'axios';

export default function PostForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    cookTime: '',
    category: '',
    imageFile: null,
    ...initialData,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService
      .getAllCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  

  const handlePostSubmit = async (formData) => {
    try {
      const res = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // your JWT
        },
      });

      alert('Post created!');
      // Add the new post to the list
      setPosts((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error('Failed to create post', err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('ingredients', form.ingredients);
    formData.append('steps', form.steps);
    formData.append('cookTime', form.cookTime);
    formData.append('category', form.category);
    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    if (onSubmit) {
      onSubmit(formData); // Your parent component should POST this to backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 border rounded">
      <Input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <Textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} required />
      <Input type="text" name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required />
      <Input type="text" name="steps" placeholder="Steps (comma separated)" value={form.steps} onChange={handleChange} required />
      <Input type="number" name="cookTime" placeholder="Cook Time (minutes)" value={form.cookTime} onChange={handleChange} required />
      
      
      <div className="mb-4">
        <label className="block font-semibold mb-1">Category</label>
        <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded p-2" required>
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <Input type="file" name="imageFile" accept="image/*" onChange={handleChange} />

      <Button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Submit
      </Button>
    </form>
  );
}
