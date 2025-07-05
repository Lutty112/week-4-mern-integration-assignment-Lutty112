import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registered! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input"/>
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="input"/>
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="input"/>
      <Button type="submit" className="bg-yellow-700 text-white px-4 py-2">
        Register
      </Button>
    </form>
  );
}
