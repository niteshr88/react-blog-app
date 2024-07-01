import { useState, useEffect } from 'react';

const useUserSession = () => {
  const [session, setSession] = useState(null);
  

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    setSession(userSession);
    
  }, []);

  return { session };
};

export default useUserSession;
