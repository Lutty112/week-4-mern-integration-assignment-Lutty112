import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/services/api';

export default function PostForm () {
const PostForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: [],
    steps: [],
    cookTime: 0,
    category: '',
    ...initialData,
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayInput = (name, value) => {
    setForm({ ...form, [name]: value.split(',').map((s) => s.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('featuredImage', form.imageFile);

    await createPost(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <Textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} />
      <Input type="text" name="ingredients" placeholder="Comma-separated ingredients" onChange={(e) => handleArrayInput('ingredients', e.target.value)} />
      <Input type="text" name="steps" placeholder="Comma-separated steps" onChange={(e) => handleArrayInput('steps', e.target.value)} />
      <Input type="number" name="cookTime" placeholder="Cook Time (minutes)" value={form.cookTime} onChange={handleChange} />
      <Input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <Input type="file" onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}/>
      <Button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</Button>
    </form>
  );
};

}
