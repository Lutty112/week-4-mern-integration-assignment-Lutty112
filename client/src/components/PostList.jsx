

export default function PostList({ posts }) {
  return (
    <div className="grid gap-4">
      {posts.map(post => (
        <div key={post._id} className="p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.description}</p>

          <h3>Ingredients:</h3>
          <ul className="list-disc ml-6">
          {post.ingredients?.split(',').map((i, idx) => (
          <li key={idx}>{i.trim()}</li>
      ))}
          </ul>       

          <h3>Steps:</h3>
          <ol className="list-decimal ml-6">
           {post.steps?.split(',').map((step, idx) => (
          <li key={idx}>{step.trim()}</li>
         ))}
          </ol>


          <p>Cook Time: {post.cookTime} minutes</p>

          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} className="max-w-xs mt-2" />
          )}
        </div>
      ))}
    </div>
  );
}
