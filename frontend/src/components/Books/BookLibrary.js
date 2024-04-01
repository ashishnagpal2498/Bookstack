// Ashish Nagpal
import React, { useEffect, useState } from 'react'
import BookCard from './layouts/BookCard'
import Pagination from './layouts/Pagination'
import { FilterBar } from './layouts/FilterBar';
import FilterMenu from './layouts/FilterMenu';
import '../../stylesheets/book-library.css'
import '../../stylesheets/filters.css'
import { LibraryBackground } from './layouts/LibraryBackground';
import axios from 'axios';
import { backend_url } from '../../util/config';

const BookLibrary = () => {
  const [books,setBooks] = useState([]);
  const [filteredBooks, updateFilteredBooks] = useState(books);
  const [loading, setLoading] = useState(true);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genreIds: [],
    authorIds: [],
    publishedYear: []
  });
  const [searchValue,setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; 

  const toggleFilterMenu = () => {
    setOpenFilterMenu(!openFilterMenu);
  };

  // Fetch all the books from backend
  useEffect(() => {
    axios.get(`${backend_url}/books/all`)
    .then(response => {
        if (response.data.status) {
            setBooks(response.data.data)
        }
        updateFilteredBooks(response.data.data)
    })
    .catch(error => {
        console.error("Error fetching genres:", error);
    });
    // eslint-disable-next-line 
  }, [])

  // Use Effect upon change of any type of Filters/ search/ sort
  useEffect(() => {
    setLoading(true);

    let updateBooks = JSON.parse(JSON.stringify(books));

    // Selected Filters
    Object.entries(selectedFilters).forEach(([filterKey, filterValues]) => {
      if (filterValues.length > 0) {
        console.log("FilterKey -->", filterKey);
        updateBooks = updateBooks.filter(book => {
              // eslint-disable-next-line 
          return filterValues.some(value => {
            if (filterKey === 'genreIds' || filterKey === 'authorIds') {
              return book[filterKey].some(item => item.name.toLowerCase().includes(value.toLowerCase()));
            } else if(filterKey === 'publishedYear'){
              return book['publisherDate'].includes(value);
            }
          });
        });
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
    setTimeout(()=> setLoading(false),1000)
  }, [selectedFilters, searchValue, sortValue]); 

  // Checkbox --> Function as Prop
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

  // Search Function sent as prop
  const onSearch = (searchValue) => {
      setSearchValue(searchValue)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='book-library-container'>
      <LibraryBackground />
      {openFilterMenu && <FilterMenu toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox={handleFilterCheckbox} selectedFilters={selectedFilters} />}
      <div className="container-row container-content-center books-container">
        <FilterBar selectedFilters={selectedFilters} onSearch={onSearch} openFilterMenu={openFilterMenu} toggleFilterMenu={toggleFilterMenu} handleFilterCheckbox= {handleFilterCheckbox} setSortValue={setSortValue} />

        {loading || filteredBooks.length > 0 ?
          <>
            <ul className="book-list">
              <BookCard books={filteredBooks} loading={loading} />
            </ul>
            <Pagination totalBooks={filteredBooks.length} booksPerPage={booksPerPage} paginate={paginate} currentPage={currentPage} />
          </>
          :
          <div style={{ width: "100%", margin: "20px", textAlign: "center", padding: "40px", fontSize: "24px" }}>No books found.</div>
        }
      </div>
    </div>

  )
}

export default BookLibrary