import React from 'react';
import Banner from './Banner';
import BookCard from './BookCard';
import Footer from './Footer';
import '../../stylesheets/home.css';

const Home = () => {
  const books = [
    { id: 1, imageUrl: "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg", caption: "Soul" },
    { id: 2, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1698210220", caption: "Memory" },
    { id: 3, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/time-dial-book-cover-template-design-9a99b5d22d3e0582282769cabafea00e.jpg?ts=1698542557", caption: "3AM Melody" },
    { id: 4, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/jewellery-magazine-cover-template-design-46164f1c6b145469776316a6fb1cba27.jpg?ts=1698303772", caption: "Jewellery" },
    { id: 5, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/paranormal-horror-book-cover-design-template-ace583d35540c6c8da22f0d75d45f614.jpg?ts=1698303713", caption: "Torture" },
    { id: 6, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/motivational-self-help-book-cover-design-template-549362a7c9d568279e866eb81510239c.jpg?ts=1704115831", caption: "Rise" },
    { id: 7, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/whisper-in-the-dark-thriller-suspense-ebook-design-template-3c405f47f39ecbde7ee49cdbdaf092c8.jpg?ts=1696561257", caption: "A Whisper in the Dark" },
    { id: 8, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1698303966", caption: "The Mind of Learders" },
    { id: 8, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/dark-horror-book-cover-design-template-74f0b0cc1c4abb0a8d8adffc5c624357.jpg?ts=1698303912", caption: "The Lord of the Lost" },
    { id: 10, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/alone-crime-book-cover-design-template-e6f37669a9929ef16b1a1e1e74c02056.jpg?ts=1698303951", caption: "Alone with a Killer" },
    { id: 11, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/romantic-chick-lit-book-cover-design-template-a9b6f5e8689ebb186d5bd5d892f99c36.jpg?ts=1698340725", caption: "Seductive Women" },
    { id: 12, imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-fantasy-book-cover-design-template-f6ae8f131508af3cd4bc82e89344083b.jpg?ts=1698537291", caption: "Shield of Oak" },


  ];

  return (
    <>
    <div className="home-container">
      <Banner
        title="Balarama"
        subtitle="The next level kids book in market."
        buttonText="SHOP NOW"
        imageUrl="https://images.pexels.com/photos/2096622/pexels-photo-2096622.jpeg"
      />
      <h1 className="popular-books-title">Popular Books</h1>
      <div className="books-container">
        <div className="books-scroll-container" >
          {books.map(book => (
            <BookCard
              key={book.id}
              imageUrl={book.imageUrl}
              caption={book.caption}
            />
          ))}
        </div>
      </div>
      <h1 className="top-sellers-title">Top Sellers</h1>
      <div className="books-container">
        <div className="books-scroll-container" >
          {books.map(book => (
            <BookCard
              key={book.id}
              imageUrl={book.imageUrl}
              caption={book.caption}
            />
          ))}
        </div>
      </div>
      <h1 className="genres-title">Genres</h1>
      <div className="scrolling-wrapper">
      <div>
          <div className="card card-block card-1">
            <span className="card-text text-white">Fiction</span> 
          </div>
        </div>
        <div>
        <div className="card card-block card-2">
          <span className="card-text  text-white">Horror</span> 
        </div>
      </div>
      <div>
      <div className="card card-block card-3">
        <span className="card-text  text-white">Adventure</span> 
      </div>
    </div>
    <div>
          <div className="card card-block card-4">
            <span className="card-text  text-white">Fantasy</span> 
          </div>
        </div>
        <div>
        <div className="card card-block card-5">
          <span className="card-text  text-white">Romance</span> 
        </div>
      </div>
      <div>
      <div className="card card-block card-6">
        <span className="card-text  text-black">Mystery</span> 
      </div>
    </div>
      </div>
      <h1 className="recommendations-title">Recommendations</h1>
      <div className="books-container">
        <div className="books-scroll-container" >
          {books.map(book => (
            <BookCard
              key={book.id}
              imageUrl={book.imageUrl}
              caption={book.caption}
            />
          ))}
        </div>
      </div>
      <h1 className="language-title">Language</h1>
      <div className="scrolling-wrapper">
      <div>
          <div className="card card-block card-7">
            <span className="card-text text-white">English</span> 
          </div>
        </div>
        <div>
        <div className="card card-block card-8">
          <span className="card-text text-white">Malayalam</span> 
        </div>
      </div>
      <div>
      <div className="card card-block card-9">
        <span className="card-text text-white">Tamil</span> 
      </div>
    </div>
    <div>
          <div className="card card-block card-10">
            <span className="card-text text-white">Kannada</span> 
          </div>
        </div>
        <div>
        <div className="card card-block card-11">
          <span className="card-text text-white">Telungu</span> 
        </div>
      </div>
      <div>
      <div className="card card-block card-12">
        <span className="card-text text-white">Hindi</span> 
      </div>
    </div>
      </div>
      <h1 className="new-title">Newly Released</h1>
      <div className="books-container">
        <div className="books-scroll-container" >
          {books.map(book => (
            <BookCard
              key={book.id}
              imageUrl={book.imageUrl}
              caption={book.caption}
            />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
