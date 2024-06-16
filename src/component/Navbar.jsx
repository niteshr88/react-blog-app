import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const checkSession = () => {
  const sessionData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  
  if (sessionData) {
    const currentTime = new Date().getTime();
    const oneHour = 3600000; // 1 hour in milliseconds

    if (currentTime - sessionData.loginTime > oneHour) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      return null;
    } else {
      return sessionData;
    }
  }
  return null;
};

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = checkSession();
    setUser(sessionUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar shadow-md pt-6 pb-6">
      <div className="w-full flex items-center">
        <div className="flex-none">
          {/* Replace 'logo.png' with the path to your logo */}
          {/* <img src="logo.png" alt="Logo" className="h-10"/> */}
          {/* <h1>Logo</h1> */}
        </div>
        <div className="flex-grow"></div>
        <ul className="nav-links flex flex-row justify-center gap-3">
          <li><Link className="navlink" to="/">Home</Link></li>
          <li><Link className="navlink" to="addblog">Add Blog</Link></li>
        </ul>
        <div className="flex-grow"></div>
        <div className="login-menu flex gap-3">
          {user ? (
            <>
              <span className="navlink">Welcome {user}</span>
              <button
                className="navlink text-red-500 hover:text-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="navlink" to="/login">Login</Link>
              <Link className="navlink" to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
