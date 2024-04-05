import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../../util/config";

const booksPerPage = 5;

const Recommended = () => {
  const [books, setBooks] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const pageCount = Math.ceil(books?.length / booksPerPage);
  const offset = pageNumber * booksPerPage;
  const currentPageBooks = books.slice(offset, offset + booksPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  const getBookDetail = async () => {
    try {
      const api = await axios.get(backend_url + "/books/all");
      console.log("====================================");
      console.log(api.data.data);
      console.log("====================================");
      if (api.data) {
        setBooks(api.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="book_recomm">
        <div className="text-start">
          <Button
            className="m-4"
            onClick={() => {
              window.history.back();
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
                {currentPageBooks?.map((book, index) => (
                  <tr key={index}>
                    <th scope="row" className="col-md-2 col-2 my-1">
                      {index + 1}
                    </th>
                    <td className="col-md-4 col-4 my-1">
                      <Link to={"/book/" + book._id}>
                        <img
                          src={book.image_url}
                          width={"100px"}
                          alt="Book cover"
                        />
                      </Link>
                    </td>
                    <td className="col-md-4 col-4">{book.book_name}</td>
                    <td className="col-md-4 col-4">
                      {book.authorIds.map((author) => author.name)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-end"}
                activeClassName={"active"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                disabledClassName={"disabled"}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recommended;
