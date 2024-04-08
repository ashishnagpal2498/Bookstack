
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rating from "react-rating";
import { isAuthenticated, isAdmin } from '../../util';
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { backend_url } from "../../util/config";
import axios from "axios";
import HeartButton from '../Favorites/HeartButton.js';
import { localStorageUtil } from "../../util";


function BookSingle() {
  const { bookId } = useParams();
  const location = useLocation();
  let logedInUserDetails = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    window.scrollTo(0, 0);
    

    if (logedInUserDetails) {
      axios({
        url: `${backend_url}/late-fees/check-restriction/${logedInUserDetails?.user_id}`,
        method: "GET",
      })
        .then((result) => {
          console.log(result.data?.status);
          
        })
        .catch((error) => {
          console.log(error);
          
        });
    }

    getBookDetail();
  },
  
  [location]);

  const [bookDetail, setBookDetail] = useState();
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  const [ratingRatio, setRatingRatio] = useState(0);
  const [recommendedbookArray, setRecommendedBookArray] = useState([]);

  const [rating, setRating] = useState(0);
  const [ratingArray, setRatingArray] = useState([]);
  const [mostRelevant, setmostRelevant] = useState([]);
  const [mostRecent, setMostRecent] = useState([]);

  const [isReleventOrRecent, setIsReleventOrRecent] = useState("recent");
  const [description, setDescription] = useState("");
  const handleClose = () => {
    setShow(false);
    console.log("handleclose", rating);
  };
  const handleShow = () => {
    setShow(true);
    console.log("handleopen", rating);
  };
  const handleRating = (value, index) => {
    setRating(value);
    console.log("aXZcXZcZdsf", value, index);
  };

  
  const handleRecent = () => {
    setIsReleventOrRecent("recent");
    setMostRecent(ratingArray);
    setmostRelevant([]);
  };
  const handleRelevant = () => {
    setIsReleventOrRecent("relevent");
    setMostRecent([]);
    setmostRelevant(ratingArray.reverse());
  };

  const getBookDetail = async () => {
    try {
      const api = await axios.get(`${backend_url}/books/${bookId}`);
      if (api.data) {
        setBookDetail(api.data.book);
        setRatingArray(api.data.book.rating);
        setMostRecent(api.data.book?.rating);

        if (api.data.book?.rating.length > 0) {
          const bookRatingRatio =
            api.data.book?.rating.reduce((acc, val) => {
              var objreating = acc + parseFloat(val.noOfStars.toFixed(1));
              return objreating;
            }, 0) / api.data.book?.rating.length;
          setRatingRatio(bookRatingRatio.toFixed(1));
        }

        setRecommendedBookArray(api.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addRating = async () => {
    try {
      const data = {
        id: bookDetail?._id,
        noOfStars: rating,
        description: description,
      };
      const api = await axios.post(backend_url + "/books/rating", data);
      if (api.status === 200) {
        toast.success("Review added successfully.");
        setRating(0);
        setDescription("");
        getBookDetail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartFunc = async () => {
    const payload = {
      email: localStorageUtil.getItem('user')?.email,
      object_id: bookId
    }
    console.log(payload);
    try {
      const response = await axios.post(backend_url+"/cart/addbook", payload);
      console.log(response);
      if(response.data.message === 'Book added'){
        toast.success("Book Added to cart successfully")
      }
      else{
        toast.info(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="description">
        <div className="container-fluid mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-10">
                <div className="row">
                  <div className="col-lg-4 col-md-5 col-sm-6 col-8 d-flex mx-auto">
                    <div className="row">
                      <div className="col-12">
                        <img
                          src={bookDetail?.image_url}
                          className="w-100 aspect-ratio"
                          alt=""
                        ></img>
                      </div>

                      <div className="col-12 text-center mt-2">
                        { (isAuthenticated() && !isAdmin())&& (
                          <Button
                            onClick={() => addToCartFunc()}
                            className="resever-btn"
                          >
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 col-12">
                    <div>
                      <h2>{bookDetail?.book_name}</h2>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2 my-3">
                        <Rating
                          stop={5}
                          initialRating={ratingRatio}
                          emptySymbol={
                            <FontAwesomeIcon
                              icon={regularStar}
                              size="1x"
                              className="medium"
                            />
                          }
                          fullSymbol={
                            <FontAwesomeIcon
                              icon={solidStar}
                              size="1x"
                              className="medium"
                              style={{ color: "#f5c842" }}
                            />
                          }
                          readonly
                        />
                      </div>
                      <a className="ps-3" href="#" onClick={handleShow}>
                        View Rating and Review
                      </a>
                    </div>
                    <p>{bookDetail?.description}</p>
                    {logedInUserDetails && <HeartButton username={logedInUserDetails?.user_id} bookName={bookDetail?.book_name} />}
                    {}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-12">
                <div className="card p-3 text-center">
                  <h5>Do you want to rate and review this book?</h5>
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 npmreatingbook">
                      {}
                      <Rating
                        stop={5}
                        
                        initialRating={rating}
                        emptySymbol={
                          <FontAwesomeIcon
                            icon={regularStar}
                            size="1x"
                            className="medium"
                          />
                        }
                        fullSymbol={
                          <FontAwesomeIcon
                            icon={solidStar}
                            size="1x"
                            className="medium"
                            style={{ color: "#f5c842" }}
                          />
                        }
                        onChange={handleRating}
                      />
                    </div>
                    <div class="my-3">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        value={description}
                        onChange={(event) => {
                          console.log(event.target.value);
                          setDescription(event.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <Button
                        onClick={() => {
                          addRating();
                        }}
                        className="resever-btn"
                      >
                        Submit
                      </Button>
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
                {}
                <div className="col-md-9 col-sm-8 col-12">
                  <h5>Name: {bookDetail?.book_name}</h5>
                  {bookDetail?.authorIds.map((author) => (
                  
                      <h6>Author: {author?.name}</h6>
                      
                  ))}

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
                    <h5>Publication</h5>
                  </div>
                </div>
                {}
                <div className="col-md-9 col-sm-8 col-12">
                  <h5>Details:</h5>
                  <h6>
                    Publisher Date:{" "}
                    {`${new Date(bookDetail?.publisherDate).getDate()}-${
                      new Date(bookDetail?.publisherDate).getMonth() - 1
                    }-${new Date(bookDetail?.publisherDate).getFullYear()}`}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <hr className="m-0" />
          <div className="container-fluid">
            <div className="row ">
              {}
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
                        {recommendedbookArray.length > 0 &&
                          recommendedbookArray.map(
                            (recommendedBookDetail, index) => {
                              return (
                                <div
                                  key={index}
                                  className="col-lg-2 col-md-3 col-sm-5 col-6"
                                >
                                  <Link
                                    to={"/book/" + recommendedBookDetail._id}
                                  >
                                    <img
                                      src={recommendedBookDetail.image_url}
                                      className="w-100"
                                      alt="..."
                                    />
                                  </Link>
                                </div>
                              );
                            }
                          )}
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
                                recommendedbookArray.map(
                                  (recommendedBookDetail, index) => {
                                    return (
                                      <li key={index}>
                                        {recommendedBookDetail.authorIds.map(
                                          (i) => i.name
                                        )}
                                      </li>
                                    );
                                  }
                                )}
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

        {}

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
                  Book Details
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
                  <div className="col-sm-6">
                    <h5 className="book-title">{bookDetail?.book_name}</h5>
                    {}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">Details</div>
                  <div className="col-sm-9">
                    <p>{bookDetail?.description}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Contributors
                  </div>
                  <div className="col-sm-9">
                    <p>{bookDetail?.book_contributors}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">Genre</div>
                  <div className="col-sm-9">
                    <p>{` ${bookDetail?.genreIds.map(
                      (genre) => genre.name
                    )} `}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Target Audience
                  </div>
                  <div className="col-sm-9">
                    <p>{bookDetail?.book_targetAudience}</p>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3 text-center fw-bolder">
                    Classification
                  </div>
                  <div className="col-sm-9">
                    <p>{bookDetail?.book_classification}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {}
            <Modal.Title>Customer Ratings & Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalReviewBody">
            <div className="d-flex align-items-center gap-2">
              <h2 className="">
                {ratingArray.length > 0 &&
                  (
                    ratingArray.reduce((acc, val) => {
                      var objreating =
                        acc + parseFloat(val.noOfStars.toFixed(1));
                      return objreating;
                    }, 0) / ratingArray.length
                  ).toFixed(1)}
              </h2>

              <div className="d-flex align-items-center gap-2">
                <Rating
                  stop={5}
                  readonly
                  initialRating={ratingRatio}
                  emptySymbol={
                    <FontAwesomeIcon
                      icon={regularStar}
                      size="1x"
                      className="medium"
                    />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      icon={solidStar}
                      size="1x"
                      className="medium"
                      style={{ color: "#f5c842" }}
                    />
                  }
                />
              </div>
              <div className="mx-1">
                {}
                <button
                  className="mx-2 btn btn-primary"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  {!showFilter ? "Show Filters" : "Hide Filters"}
                </button>
              </div>
            </div>

            <div
              className={`${
                showFilter ? "d-flex" : "d-none"
              } flex-wrap mt-3 justify-content-center`}
            >
              <div>
                <FontAwesomeIcon
                  icon={faFilter}
                  className="fs-3 mx-sm-2 mx-1"
                />
              </div>
              <div>
                <button
                  className={`cursor-pointer mx-sm-2 mx-1 ${
                    isReleventOrRecent !== "relevent" ? "flActive" : ""
                  }`}
                  onClick={handleRecent}
                >
                  Most Recent
                </button>
              </div>
              <div>
                <button
                  className={`cursor-pointer mx-sm-2 mx-1 ${
                    isReleventOrRecent === "relevent" ? "flActive" : ""
                  }`}
                  onClick={handleRelevant}
                >
                  Most Relevant
                </button>
              </div>
            </div>
            {isReleventOrRecent === "recent" ? (
              <>
                {mostRecent.map((mostRecentData, index) => (
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
                          initialRating={mostRecentData.noOfStars}
                          emptySymbol={
                            <FontAwesomeIcon
                              icon={regularStar}
                              size="1x"
                              className="medium"
                            />
                          }
                          fullSymbol={
                            <FontAwesomeIcon
                              icon={solidStar}
                              size="1x"
                              className="medium"
                              style={{ color: "#f5c842" }}
                            />
                          }
                        />
                      </div>
                      <h6 className="mt-1">{mostRecentData.description}</h6>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {mostRelevant?.map((mostRelevantData, index) => (
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
                          initialRating={mostRelevantData.noOfStars}
                          emptySymbol={
                            <FontAwesomeIcon
                              icon={regularStar}
                              size="1x"
                              className="medium"
                            />
                          }
                          fullSymbol={
                            <FontAwesomeIcon
                              icon={solidStar}
                              size="1x"
                              className="medium"
                              style={{ color: "#f5c842" }}
                            />
                          }
                        />
                      </div>
                      <h6 className="mt-1">{mostRelevantData.description}</h6>
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
