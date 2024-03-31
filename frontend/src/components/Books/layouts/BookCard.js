// Ashish Nagpal
import React from 'react'
import { Link } from 'react-router-dom'
const BookCard = ({ books, loading }) => {

  if(loading){
    let skeletionLoading = [];
    for(let i=0;i<8;i++){
      skeletionLoading.push(

        <li  key={i}>
        <Link  className={`book-library-card ${loading? "loading": ''}`} to={`/book/}`}>
            <div className="skeleton-book-bg">
              <div className='skeleton-book-cover'>
              </div>
            </div>
            </Link>
            </li>
      )
    }
    return skeletionLoading;
  }
  return (
    <>
      {books.map((book, index) => (
        <li  key={index}>
          <Link alt={book.name} className={`book-library-card ${loading? "loading": ''}`} to={`/book/${book._id}`}>
          {loading ?
              <div className="skeleton-book-bg">
                <div className='skeleton-book-cover'>
                </div>
              </div>
            : 
            <div className='book-cover'>
            <img
              className="book-img"
              src={book.image_url}
              alt={book.book_name}
            />
            </div>
            }
          <div className="book-shelf"></div>
          </Link>
        </li>
      ))}
    </>
  )
}

export default BookCard