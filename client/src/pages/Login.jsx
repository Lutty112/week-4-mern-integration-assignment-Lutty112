import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    const res = await api.post('/auth/login', form);
    const { token, user } = res.data;
    login(user, token); 
    navigate('/home');  
   
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};

    return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <Button type="submit" className="bg-yellow-700 text-white px-4 py-2">Login</Button>
    </form>
  );
}
