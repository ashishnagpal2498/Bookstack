// Ashish Nagpal
import React from 'react';

const Pagination = ({ totalBooks, booksPerPage, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button className='pagination-btn' onClick={prevPage} disabled={currentPage === 1}>
        &laquo; &nbsp; Prev
      </button>
      <ul>
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page + 1} className={page + 1 === currentPage ? 'active' : ''} onClick={() => paginate(page + 1)}>{page + 1}</li>
        ))}
      </ul>
      <button className='pagination-btn' onClick={nextPage} disabled={currentPage === totalPages}>
        Next &nbsp; &raquo;
      </button>
    </div>
  );
};

export default Pagination;
