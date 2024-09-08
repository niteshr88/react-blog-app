import React from 'react';
import { useParams } from 'react-router-dom';

export default function Welcome() {
  const { slug } = useParams(); // Extract the slug from the URL

  // Example validation (customize as needed)
  const isValidSlug = (slug) => {
    
   // return slug && slug.length > 0; // Simple validation example
  };

  return (
    <div>
     
        <h1>Welcome</h1>
      
    </div>
  );
}
