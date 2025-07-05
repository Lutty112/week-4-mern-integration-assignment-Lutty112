import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { postService } from '../services/api'; 
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl text-yellow-800 font-bold">Welcome, {user?.name || 'Chef'}!</h1>
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-yellow-800 font-bold mb-4">All Recipes</h1>
          <p className="text-gray-800">Explore our collection of delicious recipes.</p>
          <Button className="bg-yellow-700 text-white px-5 py-3 rounded-lg hover:bg-orange-900 transition">
            Create New Recipe
          </Button>
        </header>
        <PostList posts={posts} />
      </div>
    </>
  );
}
