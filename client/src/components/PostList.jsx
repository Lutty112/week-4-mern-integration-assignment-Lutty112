import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <Link
          to={`/posts/${post.slug}`}
          key={post._id}
          className="block border rounded-lg shadow-sm hover:shadow-md transition-all p-4 hover:bg-orange-50"
        >
          <div className="flex flex-col lg:flex-row items-start gap-6">
            {/* LEFT: Text content */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-3">{post.description}</p>

              <h3 className="font-medium">Ingredients:</h3>
              <ul className="list-disc ml-6 mb-2">
                {post.ingredients?.split(',').map((i, idx) => (
                  <li key={idx}>{i.trim()}</li>
                ))}
              </ul>

              <h3 className="font-medium">Steps:</h3>
              <ol className="list-decimal ml-6 mb-2">
                {post.steps?.split(',').map((step, idx) => (
                  <li key={idx}>{step.trim()}</li>
                ))}
              </ol>

              <p className="text-sm">Cook Time: {post.cookTime} minutes</p>
            </div>

            {/* RIGHT: Image */}
            {post.image && (
               <img
                src={`http://week-4-mern-integration-assignment-bfk9.onrender.com/api${post.image}`}
                alt={post.title}
                className="w-full max-w-sm rounded-lg object-cover"
               />
             )}
          </div>
        </Link>
      ))}
    </div>
  );
}
