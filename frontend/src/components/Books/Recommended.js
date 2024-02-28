import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom';

const booksPerPage = 5;

const Recommended = () => {
  // eslint-disable-next-line no-unused-vars
  const [books, setBooks] = useState([
    { bookName: "Book1", author: "Author1" },
    { bookName: "Book2", author: "Author2" },
    { bookName: "Book3", author: "Author3" },
    { bookName: "Book4", author: "Author4" },
    { bookName: "Book5", author: "Author5" },
    { bookName: "Book6", author: "Author6" },
    { bookName: "Book7", author: "Author7" },
    { bookName: "Book8", author: "Author8" },
    { bookName: "Book9", author: "Author9" },
    { bookName: "Book10", author: "Author10" },
    { bookName: "Book11", author: "Author11" },
    { bookName: "Book12", author: "Author12" },
    { bookName: "Book13", author: "Author13" },
    { bookName: "Book14", author: "Author14" },
    { bookName: "Book15", author: "Author15" },
    { bookName: "Book16", author: "Author16" },
    { bookName: "Book17", author: "Author17" },
    { bookName: "Book18", author: "Author18" },
    { bookName: "Book19", author: "Author19" },
    { bookName: "Book20", author: "Author20" },
    { bookName: "Book21", author: "Author21" },
    { bookName: "Book22", author: "Author22" },
    { bookName: "Book23", author: "Author23" },
    { bookName: "Book24", author: "Author24" },
    { bookName: "Book25", author: "Author25" },
    { bookName: "Book26", author: "Author26" },
    { bookName: "Book27", author: "Author27" },
    { bookName: "Book28", author: "Author28" },
    { bookName: "Book29", author: "Author29" },
    { bookName: "Book30", author: "Author30" },
    { bookName: "Book31", author: "Author31" },
    { bookName: "Book32", author: "Author32" },
    { bookName: "Book33", author: "Author33" },
    { bookName: "Book34", author: "Author34" },
    { bookName: "Book35", author: "Author35" },
    { bookName: "Book36", author: "Author36" },
    { bookName: "Book37", author: "Author37" },
    { bookName: "Book38", author: "Author38" },
    { bookName: "Book39", author: "Author39" },
    { bookName: "Book40", author: "Author40" },
    { bookName: "Book41", author: "Author41" },
    { bookName: "Book42", author: "Author42" },
    { bookName: "Book43", author: "Author43" },
    { bookName: "Book44", author: "Author44" },
    { bookName: "Book45", author: "Author45" },
    { bookName: "Book46", author: "Author46" },
    { bookName: "Book47", author: "Author47" },
    { bookName: "Book48", author: "Author48" },
    { bookName: "Book49", author: "Author49" },
    { bookName: "Book50", author: "Author50" }
  ]);

  const [pageNumber, setPageNumber] = useState(0);

  const pageCount = Math.ceil(books.length / booksPerPage);
  const offset = pageNumber * booksPerPage;
  const currentPageBooks = books.slice(offset, offset + booksPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <section className="book_recomm">
        <div className="text-start">
          <Button
            className="m-4"
            onClick={() => {
              window.location.href = "/book/1";
            }}
          >
            Back
          </Button>
        </div>
        <div className="container">
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Book Cover</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Author</th>
                </tr>
              </thead>
              <tbody>
                {currentPageBooks.map((book, index) => (
                  <tr key={index}>
                    <th scope="row" className="col-md-2 col-2 my-1">{index + 1}</th>
                    <td className="col-md-4 col-4 my-1">
                    <Link to={'/book/' + (index + 1)}>
                      <img
                        src="https://pngimg.com/d/book_PNG2111.png"
                        width={"100px"}
                        alt="Book cover"
                      />
                      </Link>
                    </td>
                    <td className="col-md-4 col-4">{book.bookName}</td>
                    <td className="col-md-4 col-4">{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={'<Previous'}
              nextLabel={'Next>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination justify-content-end'}
              activeClassName={'active'}
              pageLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              breakLinkClassName={'page-link'}
              disabledClassName={'disabled'}
            />
          </div>
        </div>
      </section>

    </>
  );
};

export default Recommended;
