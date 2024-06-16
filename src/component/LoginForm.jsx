import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      UserName: formData.email,
      Password: formData.password
    };

    try {
      const response = await fetch('https://localhost:44317/api/userlogin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let result;
      try {
        result = await response.json();
      } catch (e) {
        const text = await response.text();
        throw new Error(text);
      }

      if (result[0].isSucess === "Success" && result[0].UserName !== '') {
        const userData = {
          ...result,
          loginTime: new Date().getTime()
        };

        if (formData.rememberMe) {
          localStorage.setItem('user', JSON.stringify(userData[0].userName));
        } else {
          sessionStorage.setItem('user', JSON.stringify(userData[0].userName));
        }

        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="mr-2"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe" className="text-gray-700">Remember Me</label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
}
