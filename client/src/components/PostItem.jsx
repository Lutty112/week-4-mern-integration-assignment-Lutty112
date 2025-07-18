import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-200">
      {/* Display the image */}
      <img
        src={`http://week-4-mern-integration-assignment-bfk9.onrender.com/api/uploads/${post.image}`}
        alt={post.title}
        className="w-full h-48 object-cover mb-4 rounded"
      />

      {/* Post title and description */}
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="mb-4">{post.description}</p>

      {/* Link to full post */}
      <Link to={`/posts/${post._id}`} className="text-orange-600 hover:underline">
        Read More
      </Link>
    </div>
  );
}
