import { useState } from 'react';
import { postService } from '../services/api';

export default function CommentForm() {
const CommentForm = ({ postId, onCommented }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await postService(postId, { content });
    setContent('');
    onCommented(); // Trigger post refresh
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment..." />
      <button type="submit" className="bg-green-500 text-white px-2 py-1">Post</button>
    </form>
  );
};

}
