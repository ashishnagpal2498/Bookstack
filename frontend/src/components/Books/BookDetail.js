import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rating from 'react-rating'
import { Link, useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { toast } from "react-toastify";

function BookSingle() {
  const { bookId } = useParams();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [recommendedbookArray, setRecommendedBookArray] = useState([
    { bookName: "Book1", author: "Author1" },
    { bookName: "Book2", author: "Author2" },
    { bookName: "Book3", author: "Author3" },
    { bookName: "Book4", author: "Author4" },
    { bookName: "Book5", author: "Author5" },
  ]);

  const [rating, setRating] = useState(0);
  const [mostRelevent, setMostRelevent] = useState([
    { ratingValue: 3, review: "ABC Book" },
    { ratingValue: 4, review: "XYZ Book" },
    { ratingValue: 5, review: "Great Book" },
    { ratingValue: 2, review: "Okay Book" },
    { ratingValue: 4, review: "Interesting Book" },
    { ratingValue: 3, review: "Nice Book" },
    { ratingValue: 4, review: "Fantastic Book" },
    { ratingValue: 2, review: "Disappointing Book" },
    { ratingValue: 5, review: "Must Read Book" },
    { ratingValue: 1, review: "Terrible Book" },
    { ratingValue: 3, review: "Meh Book" },
  ]);
  const [mostRecent, setMostRecent] = useState([
    { ratingValue: 3, review: "Hello" },
    { ratingValue: 4, review: "Hello Data Book" },
    { ratingValue: 5, review: "The Great Book Of IT" },
    { ratingValue: 2, review: "Okay Book It Now" },
    { ratingValue: 4, review: "Interesting Book of Jungle" },
    { ratingValue: 3, review: "Nice Book for Children" },
    { ratingValue: 4, review: "Fantastic Book for Kdrama Lovers" },
    { ratingValue: 2, review: "Disappointing Book for Developers" },
    { ratingValue: 5, review: "Must Read Book for Thrill Lover" },
    { ratingValue: 1, review: "Terrible Book for Me" },
    { ratingValue: 3, review: "Meh Book No Bro No" },
  ]);

  const [isReleventOrRecent, setIsReleventOrRecent] = useState("recent");
  // setRating(rate);
  const handleClose = () => {
    setShow(false);
    console.log("handleclose", rating);
  };
  const handleShow = () => {
    setShow(true);
    console.log("handleopen", rating);
  };
  // Optinal callback functions
  const handleRating = (value, index) => {
    setRating(value);
    console.log("aXZcXZcZdsf", value, index);
  };

  const onPointerEnter = (value, index) => console.log("adsf", value, index);
  const onPointerLeave = () => {
    console.log("Leave");
    // setRating(0);
  };
  const onPointerMove = (value, index) => {
    console.log("abc", value, index);
  };
  const handleRecent = () => {
    setIsReleventOrRecent("recent");
  };
  const handlerevelant = () => {
    setIsReleventOrRecent("relevent");
  };

  const recent = [];

  return (
    <>
      <section className="review">
        <div className="container-fluid mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-10">
                <div className="row">
                  <div className="col-lg-3 col-md-5 col-sm-6 col-8 d-flex mx-auto">
                    <img
                      src="https://pngimg.com/d/book_PNG2111.png"
                      className="w-100"
                    ></img>
                  </div>
                  <div className="col-lg-9 col-md-12 col-12">
                    <h2>Book Name</h2>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2 my-3">
                        <Rating
                          stop={5}
                          initialRating={3}
                          emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" className="medium" />}
                          fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" className="medium" style={{ color: '#f5c842' }} />}
                          readonly
                        />
                      </div>
                      <a className="ps-3" href="#" onClick={handleShow}>
                        View Rating and Review
                      </a>
                    </div>
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!
                    </p>
                    <p>
                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book."
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-12">
                <div className="card p-3 text-center">
                  <h5>your Review for this Book</h5>
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 npmreatingbook">
                      {/* <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i> */}
                      <Rating
                        stop={5}
                        emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" className="medium" />}
                        fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" className="medium" style={{ color: '#f5c842' }} />}
                      />
                    </div>
                    <div class="my-3">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <Button onClick={()=>{
                        toast.success("Review added successfully.")
                      }}>Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-100" />
          <div className="container">
            <div className=" p-3 mt-4">
              <div className="row ">
                <div className="col-md-3 col-sm-4 col-12">
                  <div>
                    <h5>About</h5>
                  </div>
                </div>
                {/* </div>
            <div className="row"> */}
                <div className="col-md-9 col-sm-8 col-12">
                  <h5>Name: Book Name</h5>
                  <h6>Author: Abcd name</h6>
                  <a
                    className="text-primery"
                    data-bs-toggle="modal"
                    data-bs-target="#BookDetails"
                  >
                    View full Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="container">
            <div className=" p-3 mt-4">
              <div className="row ">
                <div className="col-md-3 col-sm-4 col-12">
                  <div>
                    <h5>Publisher Details</h5>
                  </div>
                </div>
                {/* </div>
            <div className="row"> */}
                <div className="col-md-9 col-sm-8 col-12">
                  <h5>Publisher Name: Book Name</h5>
                  <h6>Publisher Date: Abcd Date</h6>
                </div>
              </div>
            </div>
          </div>
          <hr className="m-0" />
          <div className="container-fluid">
            <div className="row ">
              {/* <div className="col-12">
              <div>
                <h5>Show Similar</h5>
              </div>
            </div> */}
            </div>
            <div className="row align-items-center">
              <div className="col-12 ">
                <div className="row">
                  <div className="col-lg-2 col-mg-3 col-12 borderRight">
                    <div>
                      <h5>Show Similar</h5>
                    </div>
                  </div>
                  <div className="col-lg-10 col-12">
                    <div className="row pt-3">
                      <div className="col-lg-12 col-12 d-flex align-items-center book-recom ">
                        {
                          recommendedbookArray.length > 0 &&
                          recommendedbookArray.map((recommendedBookDetail, index) => {
                            return (
                              <div key={index} className="col-lg-2 col-md-3 col-sm-5 col-6">
                                <Link to={'/book/' + (index+1)}>

                                  <img
                                    src="https://pngimg.com/d/book_PNG2111.png"
                                    className="w-100"
                                    alt="..."
                                  />
                                </Link>
                              </div>
                            )
                          })
                        }
                        <div className=" col-md-4 col-sm-5 col-6 text-end">
                          <h5>
                            <Link to={"/Recommended"}>
                              Show all recommendations
                            </Link>
                          </h5>
                        </div>
                      </div>
                      <div className=" col-12">
                        <hr />
                        <div className="row  mt-3 justify-content-start">
                          <div className="col-12 my-3">
                            <h5>Related Authors</h5>
                          </div>
                          <div className="col-12">
                            <ul>
                              {recommendedbookArray.length > 0 &&
                                recommendedbookArray.map((recommendedBookDetail, index) => {
                                  return (
                                    <li key={index}>{recommendedBookDetail.author}</li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mb-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Models */}

        <div
          class="modal fade"
          id="BookDetails"
          tabindex="-1"
          aria-labelledby="BookDetailsLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="BookDetailsLabel">
                  BookDetails
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    <i className="fa fa-book"></i>
                  </div>
                  <div className="col-sm-9">
                    <h5 className="book-title">Book Title</h5>
                    <p>
                      Welcome to Mowgli's World
                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">Details</div>
                  <div className="col-sm-9">
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!

                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book." In this awesome collection of stories, we're diving deep into the heart of the jungle where excitement, friendship, and discovery are waiting for you around every corner.

                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Contributors
                  </div>
                  <div className="col-sm-9">
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!

                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book." In this awesome collection of stories, we're diving deep into the heart of the jungle where excitement, friendship, and discovery are waiting for you around every corner.

                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">Genre</div>
                  <div className="col-sm-9">
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!

                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book." In this awesome collection of stories, we're diving deep into the heart of the jungle where excitement, friendship, and discovery are waiting for you around every corner.

                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Target Audience
                  </div>
                  <div className="col-sm-9">
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!

                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book." In this awesome collection of stories, we're diving deep into the heart of the jungle where excitement, friendship, and discovery are waiting for you around every corner.
                    </p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Classification
                  </div>
                  <div className="col-sm-9">
                    <p>
                      Hey there, Jungle Book Fans! Welcome to Mowgli's World!

                      Get ready to swing from vine to vine and roam the untamed wilderness alongside Mowgli, the fearless hero of Rudyard Kipling's legendary tale, "The Jungle Book." In this awesome collection of stories, we're diving deep into the heart of the jungle where excitement, friendship, and discovery are waiting for you around every corner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Book 1</Modal.Title> */}
            <Modal.Title>Customer reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalReviewBody">
            <div className="d-flex align-items-center gap-2">
              <h2 className="">
                {mostRecent.length > 0 &&
                  (
                    mostRecent.reduce((acc, val) => {
                      var objreating =
                        acc + parseFloat(val.ratingValue.toFixed(1));
                      return objreating;
                    }, 0) / mostRecent.length
                  ).toFixed(1)}
              </h2>

              <div className="d-flex align-items-center gap-2">
                <Rating
                  stop={5}
                  readonly
                  initialRating={3.5}
                  emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" className="medium" />}
                  fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" className="medium" style={{ color: '#f5c842' }} />}
                />
              </div>
              <div className="mx-1">( {mostRecent.length} review)
              <button className="mx-2 btn btn-primary" onClick={()=>{setShowFilter(prev=>!prev)}}>{!showFilter ? "Show Filters": "Hide Filters"}</button>
              </div>
            </div>


            <div className={`${showFilter ? "d-flex" : "d-none"} flex-wrap mt-3 justify-content-center`}>
              <div>
                <i class="fa-solid fa-filter fs-3 mx-sm-2 mx-1"></i>
              </div>
              <div>
                <a
                  className={`cursor-pointer mx-sm-2 mx-1 ${isReleventOrRecent !== "relevent" ? "flActive" : ""
                    }`}
                  onClick={handleRecent}
                >
                  Most Recent
                </a>
              </div>
              <div>
                <a
                  className={`cursor-pointer mx-sm-2 mx-1 ${isReleventOrRecent === "relevent" ? "flActive" : ""
                    }`}
                  onClick={handlerevelant}
                >
                  Most Relevant
                </a>
              </div>
            </div>
            {isReleventOrRecent === "recent" ? (
              <>
                {mostRecent?.map((mostRecentData, index) => (
                  <div
                    key={index}
                    className="my-2 d-flex align-items-center npmreating1"
                  >
                    <div className="mx-2">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="mx-2">
                      <div className="d-flex align-items-center gap-2">
                        <Rating
                          stop={5}
                          readonly
                          initialRating={mostRecentData.ratingValue}
                          emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" className="medium" />}
                          fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" className="medium" style={{ color: '#f5c842' }} />}
                        />
                      </div>
                      <h6 className="mt-1">{mostRecentData.review}</h6>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {mostRelevent?.map((mostReleventData, index) => (
                  <div
                    key={index}
                    className="my-2 d-flex align-items-center npmreating1"
                  >
                    <div className="mx-2">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="mx-2">
                      <div className="d-flex align-items-center gap-2">
                        <Rating
                          stop={5}
                          readonly
                          initialRating={mostReleventData.ratingValue}
                          emptySymbol={<FontAwesomeIcon icon={regularStar} size="1x" className="medium" />}
                          fullSymbol={<FontAwesomeIcon icon={solidStar} size="1x" className="medium" style={{ color: '#f5c842' }} />}
                        />
                      </div>
                      <h6 className="mt-1">{mostReleventData.review}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}

export default BookSingle;
