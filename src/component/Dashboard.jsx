import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    setSession(userSession);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (session === null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <section className="mt-20">
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
