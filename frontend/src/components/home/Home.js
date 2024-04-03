import React from 'react';
import '../../stylesheets/home.css';
import { Container } from 'react-bootstrap';
import homebg from "../../assets/home-bg.jpg";
import bookLover from "../../assets/book-lover.png";
import bookDetailsIcon from "../../assets/book-details.png";
import openBookIcon from "../../assets/open-book.png";
import favIcon from "../../assets/favourite.png";
import feedbackIcon from "../../assets/feedback.png";

const Home = () => {
  return (
    <>
      <div className='home-div'>
        <Container id="hero" className='mb-5'>
        <div className="row">
          <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
            <div className='home-info-text-div'>
              <h1>Welcome to Book Stack</h1>
              <h2> Your Ultimate Book Rental Destination</h2>
              <a href="/books" className="btn-get-started scrollto">Explore Books</a>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
            <img loading='lazy' src={homebg} className="img-fluid" alt="" />
          </div>
        </div>
        </Container>
      </div>
      <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in">
              <img loading='lazy' src={bookLover} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6">
              <div className="pt-4 pt-lg-0">
                <h3>Our Book Rental Service</h3>
                <p class="fst-italic">
                  Welcome to Book Stack, your premier destination for renting books online. We are passionate about providing avid readers with a convenient and affordable way to access a vast library of books.
                </p>
                <ul>
                  <li> Explore a diverse collection of books spanning various genres, from fiction to non-fiction, classics to contemporary bestsellers.</li>
                  <li> Enjoy flexible rental options tailored to your reading preferences, whether you prefer short-term rentals for a quick read or long-term rentals for an in-depth exploration.</li>
                  <li>Experience hassle-free browsing and booking with our user-friendly platform designed to make your book rental journey seamless and enjoyable.</li>
                </ul>
                <p>
                  At Book Stack, we are committed to enhancing your reading experience by providing exceptional service and a wide selection of books at your fingertips. Start your reading adventure with us today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services" class="services section-bg">
        <div class="container">
          <div class="section-title" data-aos="fade-up">
            <h2>Services</h2>
            <p>Discover the key features that make Book Stack your ultimate destination for book rentals.</p>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in">
              <div class="icon-box icon-box-pink">
                <div class="icon"><img loading="lazy" src={bookDetailsIcon} alt="" /></div>
                <h4 class="title">Book Details</h4>
                <p class="description">Access comprehensive details and information about each book in our extensive collection.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="100">
              <div class="icon-box icon-box-cyan">
                <div class="icon"><img loading="lazy" src={favIcon} alt="" /></div>
                <h4 class="title">Favorites</h4>
                <p class="description">Easily mark and manage your favorite books for quick access and personalized recommendations.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
              <div class="icon-box icon-box-green">
                <div class="icon"><img loading="lazy" src={openBookIcon} alt="" /></div>
                <h4 class="title">Book Library</h4>
                <p class="description">Explore our vast library of books spanning various genres and topics to find your next read.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" data-aos="zoom-in" data-aos-delay="300">
              <div class="icon-box icon-box-blue">
                <div class="icon"><img loading="lazy" src={feedbackIcon} alt="" /></div>
                <h4 class="title">Book Feedback</h4>
                <p class="description">Share your thoughts and feedback on the books you've read to help other users make informed choices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
