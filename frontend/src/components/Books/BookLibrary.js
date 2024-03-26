import React, { useEffect, useState } from 'react'
import BookCard from './layouts/BookCard'
import Pagination from './layouts/Pagination'
import { FilterBar } from './layouts/FilterBar';
import FilterMenu from './layouts/FilterMenu';
import '../../stylesheets/book-library.css'
import '../../stylesheets/filters.css'
import { LibraryBackground } from './layouts/LibraryBackground';

const books = [
  {
    title: "Percy Jackson 1",
    author: "Rick Riordan",
    genres: "Action",
    publishedYear: "2009",
    _id: "1"
  }, {
    title: "Percy Jackson 2",
    author: "Rick Riordan",
    genres: "Suspense",
    publishedYear: "2011",
    _id: "2"
  },
  {
    title: "Percy Jackson 3",
    author: "Rick Riordan",
    genres: "Action",
    publishedYear: "2013",
    _id: "3"
  },
  {
    title: "Harry Potter 1",
    author: "J. K Rowling",
    genres: "Children",
    publishedYear: "2005",
    _id: "4"
  },
  {
    title: "Harry Potter 2",
    author: "J. K Rowling",
    genres: "Drama",
    publishedYear: "2008",
    _id: "5"
  },
  {
    title: "Harry Potter 3",
    author: "J. K Rowling", 
    genres: "Drama",
    publishedYear: "2011",
    _id: "6"
  }

];

const BookLibrary = () => {

  const [filteredBooks, updateFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genres: [],
    author: [],
    publishedYear: []
  });

  const toggleFilterMenu = () => {
    setOpenFilterMenu(!openFilterMenu);
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  useEffect(() => {
    setLoading(true);

    let updatedBooks = books;

    Object.entries(selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues.length > 0) {
        updatedBooks = updatedBooks.filter(book =>
          filterValues.every(value => book[filterKey].includes(value))
        );
      }
    });

    updateFilteredBooks(updatedBooks);
    setLoading(false)
  }, [selectedFilters]); 

  const handleFilterCheckbox = (category, value, remove=false) => {
    console.log("Handle FIlter Parent called - " + category + " - " + value + "  " + remove)
    if(remove){
      setSelectedFilters(prevState => ({
        ...prevState,
        [category]: prevState[category].filter(item => item !== value)
    }));
      return;
    }
    setSelectedFilters(prevState => ({
        ...prevState,
        [category]: prevState[category].includes(value)
            ? prevState[category].filter(item => item !== value)
            : [...prevState[category], value]
    }));
  };

  const onSearch = (searchValue) => {
            
    let filterData = JSON.parse(JSON.stringify(filteredBooks)); 
    filterData = filterData.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase()))
    updateFilteredBooks(filterData)
  }

  return (
    <div className='book-library-container'>
      <LibraryBackground />
      {openFilterMenu && <FilterMenu toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox={handleFilterCheckbox} selectedFilters={selectedFilters} />}
      <div className="container-row container-content-center books-container">
        <FilterBar selectedFilters={selectedFilters} onSearch={onSearch} books={filteredBooks} openFilterMenu={openFilterMenu} toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox= {handleFilterCheckbox} />

        {filteredBooks.length > 0 ?
          <ul className="book-list">
            <BookCard books={filteredBooks} loading={loading} />
          </ul>
          :
          <div style={{ width: "100%", margin: "20px", textAlign: "center", padding: "40px", fontSize: "24px" }}>No books found.</div>
        }
        <Pagination />
      </div>
    </div>

  )
}

export default BookLibrary