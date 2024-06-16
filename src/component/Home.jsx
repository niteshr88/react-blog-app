import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:44317/api/getalblog")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9- ]/g, '')  // Remove special characters except hyphens and spaces
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .trim();
  };

  const handleReadMore = (post) => {
    const slug = generateSlug(post.title);
    navigate(`/readblog/${slug}`, { state: { post } });
  };

  const getPreviewText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleEdit = (post) => {
    // Logic for editing the post
    navigate(`/addblog/`, { state: { post } });
  };

  const openDeleteModal = (postId) => {
    setPostIdToDelete(postId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPostIdToDelete(null);
  };
  const handleDelete = async () => {
    if (!postIdToDelete) return;
    try {
      const response = await fetch(`https://localhost:44317/api/deleteblog/${postIdToDelete}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.isSucess === "Success") {
        alert(result.message);
        setPosts(posts.filter(post => post.id !== postIdToDelete));
      } else {
        alert(`Failed to delete post: ${result.Message}`);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('An error occurred while deleting the post.');
    } finally {
      closeDeleteModal();
    }
  };


  return (
    <>
    <div className="w-full flex justify-center mt-6">
        <h1 className="text-4xl font-bold text-gray-800">Tech Blog</h1>
      </div>
    
    <div className="posts-container grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-3">
      
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
        >
          <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
            <img
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
              alt="card-image"
            />
          </div>
          
          <div className="p-6">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {post.title}
            </h5>
            <p className="block text-wrap font-sans text-base antialiased font-light leading-relaxed text-inherit">
             {parse(getPreviewText(post.description, 10))}
            </p>
            <h5>Author: {post.authorName}</h5>
          </div>
          <div className="p-6 pt-0">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => handleReadMore(post)}
            >
              Read More
            </button>
            <div className="absolute bottom-0 right-0 m-2 space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEdit(post)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => openDeleteModal(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
          
        </div>
      ))}
{isDeleteModalOpen  &&
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete Blog</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure you want to delete.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={handleDelete} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">OK</button>
          <button type="button" onClick={closeDeleteModal} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>}

    </div>
    </>
  );
}
