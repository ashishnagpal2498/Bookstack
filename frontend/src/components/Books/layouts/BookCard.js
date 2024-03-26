import React from 'react'
import bookUrl1 from "../../../book-cover-1.png"
import bookUrl2 from "../../../book-cover-2.jpg"
import { Link } from 'react-router-dom'
const BookCard = ({ books, loading }) => {
  return (
    <>
      {books.map((book, index) => (
        <li  key={index}>
          <Link className={`book-library-card ${loading? "loading": ''}`} to={`/book/${book._id}`}>
          {loading ?
              <div className="skeleton-book-bg">
                <div className='skeleton-book-cover'>
                </div>
              </div>
            : 
            <div className='book-cover'>
            <img
              className="book-img"
              src={book.title.includes("Potter") ? bookUrl2 : bookUrl1}
              alt={book.title}
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