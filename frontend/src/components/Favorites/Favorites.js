// Author - Aiwin Charalil Manuel
import React, { useState, useEffect } from 'react';
import HeartButton from './HeartButton';
import { backend_url } from "../../util/config";


const Favorites = () => {
  
  const [favorites, setFavorites] = useState([]);
  const loggedInUserDetails = JSON.parse(localStorage.getItem("user"));
  const username = loggedInUserDetails?.user_id || "TestUser"

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${backend_url}/api/favorites?username=${encodeURIComponent(username)}`);
      const data = await response.json();
      setFavorites(data); 
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [username]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Favorite Books</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {favorites.map((fav, index) => (
          <div key={index} style={{
            width: '100vw',
            maxWidth: '1000px',
            background: '#f0f0f0',
            margin: '10px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p style={{ fontWeight: 'bold', margin: '0' }}>{fav.bookName}</p>
            <HeartButton username={username} bookName={fav.bookName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;