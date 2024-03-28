import React, { useEffect, useState } from 'react'
import BookCard from './layouts/BookCard'
import Pagination from './layouts/Pagination'
import { FilterBar } from './layouts/FilterBar';
import FilterMenu from './layouts/FilterMenu';
import '../../stylesheets/book-library.css'
import '../../stylesheets/filters.css'
import { LibraryBackground } from './layouts/LibraryBackground';
import axios from 'axios';
import { backend_url } from '../../config';
// const books = [
//   {
//     book_name: "Percy Jackson 1",
//     author: "Rick Riordan",
//     genres: "Sci-fi",
//     publishedYear: "2009",
//     _id: "1",
//     price: 29
//   }, {
//     book_name: "Percy Jackson 2",
//     author: "Rick Riordan",
//     genres: "Sci-fi",
//     publishedYear: "2011",
//     _id: "2",
//     price: 45
//   },
//   {
//     book_name: "Percy Jackson 3",
//     author: "Rick Riordan",
//     genres: "Action",
//     publishedYear: "2013",
//     _id: "3",
//     price: 32
//   },
//   {
//     book_name: "Harry Potter 1",
//     author: "J. K Rowling",
//     genres: "Fiction",
//     publishedYear: "2005",
//     _id: "4",
//     price: 27
//   },
//   {
//     book_name: "Harry Potter 2",
//     author: "J. K Rowling",
//     genres: "Drama",
//     publishedYear: "2008",
//     _id: "5",
//     price: 91
//   },
//   {
//     book_name: "Harry Potter 3",
//     author: "J. K Rowling", 
//     genres: "Drama",
//     publishedYear: "2011",
//     _id: "6",
//     price: 69
//   }

// ];

const BookLibrary = () => {
  const [books,setBooks] = useState([]);
  const [filteredBooks, updateFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genres: [],
    author: [],
    publishedYear: []
  });
  const [searchValue,setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("price");

  const toggleFilterMenu = () => {
    setOpenFilterMenu(!openFilterMenu);
  };
  useEffect(() => {
    console.log("USE effect")
    axios.get(`${backend_url}/books/all`)
    .then(response => {
        if (response.data.status) {
            console.log("Response", response);
            setBooks(response.data.data)
        }
        setTimeout(() => setLoading(false), 5000)
        updateFilteredBooks(response.data.data)
    })
    .catch(error => {
        console.error("Error fetching genres:", error);
    });
  }, [])

  // Use Effect upon change of any type of Filters/ search/ sort
  useEffect(() => {
    setLoading(true);

    let updateBooks = JSON.parse(JSON.stringify(books));

    // Selected Filters
    Object.entries(selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues.length > 0) {
        updateBooks = updateBooks.filter(book =>
          filterValues.every(value => book[filterKey].includes(value))
        );
      }
    });

    // Searching Functionality
    updateBooks = updateBooks.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase()))

    // Sort Functionality
    console.log(sortValue)
    if (sortValue === "price") {
      updateBooks.sort((a, b) => a.price - b.price);
    } else if (sortValue === "name") {
      updateBooks.sort((a, b) => a.book_name.localeCompare(b.book_name));
    }
  
    console.log("Updated Books ", updateBooks)
    updateFilteredBooks(updateBooks);
    setLoading(false)
  }, [selectedFilters, searchValue, sortValue]); 

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
      setSearchValue(searchValue)
  }

  return (
    <div className='book-library-container'>
      <LibraryBackground />
      {openFilterMenu && <FilterMenu toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox={handleFilterCheckbox} selectedFilters={selectedFilters} />}
      <div className="container-row container-content-center books-container">
        <FilterBar selectedFilters={selectedFilters} onSearch={onSearch} openFilterMenu={openFilterMenu} toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox= {handleFilterCheckbox} setSortValue={setSortValue} />

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