import React from 'react';
import '../../stylesheets/bookCard.css'; 

const BookCard = ({ imageUrl, caption }) => {
  return (
    <div className="book-card-container" onClick={()=>{
      window.location.href = "/book/1"
    }}>
      <div className="book-card">
        <img src={imageUrl} alt="Book" className="book-image" />
      </div>
      <div className="book-caption">{caption}</div>
    </div>
  );
};

export default BookCard;
