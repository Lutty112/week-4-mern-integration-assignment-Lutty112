import { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import PostForm from '../components/PostForm';  // import your form component

import Ugali from '../assets/Ugali.jpg';
import Pilau from '../assets/Pilau.jpg';
import BeefBurger from '../assets/BeefBurger.png';

import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await postService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Custom function to handle post creation with image
  const handleCreatePost = async (formData) => {
    setSubmitting(true);
    try {
      // Use fetch since postService.createPost expects JSON, and this is FormData with image
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // No Content-Type header! Let browser set it for multipart/form-data
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      const newPost = await res.json();
      setPosts([newPost, ...posts]); // add new post at top
      setShowForm(false); // hide form after submit
      alert('Post created successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-yellow-800 font-bold">
          Welcome, {user?.name || 'Chef'}!
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
  {/* LEFT: Recipes & Posts */}
  <div className="flex-1 space-y-6">
    <header className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl text-yellow-800 font-bold">All Recipes</h1>
        <p className="text-gray-800">Explore our collection of delicious recipes.</p>
      </div>
      <Button
        onClick={() => setShowForm(!showForm)}
        className="bg-yellow-700 text-white px-5 py-3 rounded-lg hover:bg-orange-900 transition"
      >
        {showForm ? 'Cancel' : 'Create New Recipe'}
      </Button>
    </header>

    {showForm && <PostForm onSubmit={handleCreatePost} />}
    <PostList posts={posts} />
  </div>

  {/* RIGHT: Featured Carousel */}
  <div className="hidden lg:block w-[360px]">
    <h2 className="text-xl font-bold text-yellow-800 mb-4">Featured Dishes</h2>
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      className="rounded-xl shadow-xl"
    >
      {[Ugali, Pilau, BeefBurger].map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Food ${index + 1}`}
            className="w-full h-72 object-cover rounded-xl transition-transform duration-300 transform hover:scale-105"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
</>
  );
}