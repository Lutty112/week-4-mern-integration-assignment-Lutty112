import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="mb-4">{post.description}</p>
      <Link to={`/posts/${post.slug}`} className="text-orange-600 hover:underline">
        Read More
      </Link>
    </div>
  );
}
