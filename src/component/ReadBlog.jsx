import { useState } from "react";
import { useLocation } from "react-router-dom";

const ReadBlog = () => {
  const { state } = useLocation();
  const { post } = state;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
   
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{post.title}</h1>
      <h5 className="text-xl text-left mb-1">Author: <span className="font-semibold">{post.authorName}</span></h5>
      <p className="text-left text-gray-600 mb-4">{post.uploadDate}</p>
      <div className="flex justify-center mb-6">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=100"
          alt="card-image"
          className="rounded-lg shadow-lg"
        />
      </div>
      <p className="text-gray-700 leading-relaxed mb-6">{post.description}</p>

      <div className="flex justify-around items-center mb-10">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleLike}
        >
          Like ({likes})
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleDislike}
        >
          Dislike ({dislikes})
        </button>
      </div>

      <form onSubmit={handleCommentSubmit} className="mb-10">
        <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">Leave a Comment</label>
        <textarea
          id="comment"
          name="comment"
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          value={newComment}
          onChange={handleCommentChange}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-100">
              <p>{comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
    
  );
};

export default ReadBlog;
