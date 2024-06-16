import { useState, useEffect  } from "react";
import Alert from "./Alert";
import { useNavigate, useLocation } from "react-router-dom";


const AddBlog = () => {
    const { state } = useLocation();
    const { post } = state || {};

    const [isSucess, setSucess] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [alertMessage, setAlertMessage] = useState('');
    const [blog, setBlog] = useState({
        ID:null,
        Title: '',
        SubTitle: '',
        Description: '',
        AuthorName: '',
        ImageUpload: null
    });
    useEffect(() => {
        if (post) {
          setBlog({
            ID:post.id || null,
            Title: post.title || "",
            SubTitle: post.subTitle || "",
            Description: post.description || "",
            AuthorName: post.authorName || "",
            ImageUpload: null, // You may need to handle image separately based on your application logic
          });
          setEdit(true)
        }
      }, [post]);
    const navigate = useNavigate();
    
    const handleInput = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setBlog({ ...blog, ImageUpload: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            Title: blog.Title,
            SubTitle: blog.SubTitle,
            Description: blog.Description,
            AuthorName: blog.AuthorName,
            ImageUpload: blog.ImageUpload
        };

        const response = await fetch('https://localhost:44317/api/addblog', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.isSucess == "Success") {
            setSucess(true)
            setAlertMessage(result.message); // Set the alert message dynamically
            setBlog({
                Title: '',
                SubTitle: '',
                Description: '',
                AuthorName: '',
                ImageUpload: null
            })
        }

        

    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ID:blog.ID,
            Title: blog.Title,
            SubTitle: blog.SubTitle,
            Description: blog.Description,
            AuthorName: blog.AuthorName,
            ImageUpload: blog.ImageUpload
        };

        const response = await fetch('https://localhost:44317/api/editblog', {
            method:'PUT',
            body:JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });

        const result = await response.json();
        if (result.isSucess == "Success") {
            setSucess(true)
            setAlertMessage(result.message); // Set the alert message dynamically
            setBlog({
                Title: '',
                SubTitle: '',
                Description: '',
                AuthorName: '',
                ImageUpload: null
            })
        }
    }

    const handleFormSubmit = (e) => {
        if (isEdit) {
            handleEditSubmit(e);
        } else {
            handleSubmit(e);
        }
    };

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className="form-container max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">

            {isSucess && <Alert msg={alertMessage} />}


            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Blog</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                <input type="hidden" id="ID" name="ID" value={blog.ID} onChange={handleInput}/>
                    <label htmlFor="Title" className="block text-sm font-medium text-gray-700">Main Title</label>
                    <input
                        type="text"
                        name="Title"
                        id="Title"
                        className="mt-1 block w-full border border-gray-300 rounded-none py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={blog.Title}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="SubTitle" className="block text-sm font-medium text-gray-700">Sub Title</label>
                    <input
                        type="text"
                        name="SubTitle"
                        id="SubTitle"
                        className="mt-1 block w-full border border-gray-300 rounded-none py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={blog.SubTitle}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="Description"
                        id="Description"
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-none py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={blog.Description}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="AuthorName" className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                        type="text"
                        name="AuthorName"
                        id="AuthorName"
                        className="mt-1 block w-full border border-gray-300 rounded-none py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={blog.AuthorName}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="ImageUpload" className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        name="ImageUpload"
                        id="ImageUpload"
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        onChange={handleFileChange}

                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="text-sm font-semibold text-gray-700"
                        onClick={handleBack}
                    >
                        Cancel
                    </button>
                    {isEdit ? (
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    )}
                    
                </div>
            </form>

        </div>
    );
};

export default AddBlog;
