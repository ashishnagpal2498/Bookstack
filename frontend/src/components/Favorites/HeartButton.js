// Author - Aiwin Charalil Manuel

import React, { useState, useEffect } from 'react';
import '../../stylesheets/heartbutton.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { backend_url } from '../../util/config';

const HeartButton = ({ username, bookName }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await fetch(`${backend_url}/api/favorites/check?username=${encodeURIComponent(username)}&bookName=${encodeURIComponent(bookName)}`);
        const data = await response.json();
        if (data.isFavorite) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavorite();
  }, [username, bookName]); 

  const toggleFavorite = async () => {
    const method = isFavorite ? 'DELETE' : 'POST';
    try {
      const response = await fetch(`${backend_url}/api/favorites`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, bookName }),
      });
      if (response.ok) {
        setIsFavorite(!isFavorite); 
        console.log(isFavorite ? "Favorite removed successfully." : "Favorite saved successfully.");
      } else {
        console.error("Failed to toggle favorite");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <button className={`heart-button ${isFavorite ? 'favorite' : ''}`} onClick={toggleFavorite}>
      {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default HeartButton;
