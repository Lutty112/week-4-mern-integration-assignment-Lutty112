import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import CommentForm from '../components/CommentForm';

export default function PostView() {
  const { slug } = useParams();
  const { get } = useApi();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   const fetchPostAgain = () => {
    get(`/posts/${id}`)
      .then(setPost)
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch post.');
      });
  };

  useEffect(() => {
    setLoading(true);
    get(`/posts/${id}`)
      .then(setPost)
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch post.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
   
  <div className="p-4">
    {/* Top area: Post content + image */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT: Post content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="italic text-sm">Category: {post.category?.name || 'N/A'}</p>
        <p>{post.description}</p>

        <h3 className="font-semibold mt-4">Ingredients:</h3>
        {post.ingredients && post.ingredients.length > 0 ? (
          <ul className="list-disc ml-6">
            {post.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients listed.</p>
        )}

        <h3 className="font-semibold mt-4">Steps:</h3>
        {post.steps && post.steps.length > 0 ? (
          <ol className="list-decimal ml-6">
            {post.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>No steps listed.</p>
        )}
      </div>

      {/* RIGHT: Featured image */}
      {post.image && (
        <div className="w-full lg:w-[400px] shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      )}
    </div>

    {/* Comments Section */}
    <div className="mt-6">
      <CommentForm postId={post._id} onCommented={fetchPostAgain} />
    </div>

    <div className="mt-6 space-y-2">
      <h3 className="font-bold text-lg">Comments</h3>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, idx) => (
          <div key={idx} className="border p-2 rounded">
            <p className="text-sm">{comment.content}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  </div>
   );
}

