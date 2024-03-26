import React, { useState } from 'react';
import HeartButton from './HeartButton'; 
const Favorites = () => {
  // Dummy username and bookName states
  const [username] = useState('TestUser');
  const [bookName] = useState('1984');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Heart Button Test Page</h1>
      <p>Click the heart to save your favorite book to MongoDB!</p>
      <HeartButton username={username} bookName={bookName} />
    </div>
  );
};

export default Favorites;
