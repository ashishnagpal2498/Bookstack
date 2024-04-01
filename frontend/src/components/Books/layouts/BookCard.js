import React from 'react'
import bookUrl1 from "../../../assets/book-cover-1.png"
import bookUrl2 from "../../../assets/book-cover-2.jpg"
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
              src={book.book_name.includes("Potter") ? bookUrl2 : bookUrl1}
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