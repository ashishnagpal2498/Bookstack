
# Assignment 3

* *Date Created*: 29 March 2024
* *Last Modification Date*: 30 March 2024
* *Project URL*: https://git.cs.dal.ca/anagpal/csci-5709-grp-13
* *Github URL*: https://github.com/ashishnagpal2498/bookStack
* *Frontend - Deployment Link*: https://bookstack-csci-group-13.netlify.app/
* *Backend - Deployment Link*: https://bookstack-grp13.onrender.com


## Authors

* [Ashish Nagpal](ashish.nagpal@dal.ca)

# Getting Started

To start with the project development for this assignment, I cloned the [project repository](https://git.cs.dal.ca/anagpal/csci-5709-grp-13) which had 1 task of the feature created by each group member. Next, I checked out into my branch - ``ashish-nagpal``, took the latest pull from main branch and started making changes to complete the ``Book Library Feature``.

# Prerequisites

1. [React](https://legacy.reactjs.org/docs/getting-started.html/) - Web framework
2. [Npm](https://docs.npmjs.com//) - Dependency Management
3. [Node](https://nodejs.org/docs/latest/api/) - Javascript Runtime environment

# Installing

1. Clone the project repository by using the URL - https://git.cs.dal.ca/anagpal/csci-5709-grp-13

2. Go into the project directory and install the required dependency for frontend and backend application using ```npm install``` command.

3. Set up the environment variables by looking at the ``.env.example`` file

4. Once the dependencies are installed, start the development server by ```npm start``` command.

5. The server for frontend application will be running on port - 3000 [http://localhost:3000](http://localhost:3000). For backend the server will be running on port 8080.

# Deployment

Deployment for Frontend is made through **Netlify**. 
[![Netlify Status](https://api.netlify.com/api/v1/badges/c9aa70e1-579d-4e9f-9e3a-f00b2c17b318/deploy-status)](https://app.netlify.com/sites/bookstack-csci-group-13/deploys)

Deployment for backend server is done on **Render**. ![](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)


# Testing
I have implemented ``Book Library feature`` which includes following tasks :-
1. View All
2. Search Books
3. Filter Books
4. Sort by Name, Price.  

In Assignment 1, I already completed the ``search books`` task. This allowed user to search particular books by adding the keywords. In this assignment, I have 

1. Created ``backend APIs`` to get all the books and list available filters for narrowing down the results. 

2. Using those APIs to perform filter on frontend.

3. Performed filtering, searching and sorting in concatenation.

To **test** the above mentioned tasks -
1. Search the keyword - "Harry" and add filter as "Fiction" in genre. Output - Books that match keyword Harry with genre as Fiction.
2. Remove the "Searched" keyword by using backspace or cross button. Output - Books that has "Fiction" as genre. 


# Sources Used

## Frontend 

### Learning Materials
To have understanding of HTML and CSS concepts and refresh my knowledge on the topics I watched following videos :-
1. [Advanced HTML/CSS Concepts Crash Course](https://www.youtube.com/watch?v=XhqEuyWjbdo) - *codedamn*

2. [Flexbox CSS In 20 Minutes](https://www.youtube.com/watch?v=JJSoEo8JSnc) - *Traversy Media*

Using the above materials, I learnt about HTML5 semantics, CSS selectors, pseudo selectors and flex boxes.

### Code 

### 1.  book-library.css

*Lines 110 - 118*

```css
.book-shelf {
    position: absolute;
    bottom: 40px;
    width: 60%;
    background: linear-gradient(30deg,rgba(254,228,175,255), #996443); /* Used here */
    padding: 5px;
    text-align: center;
    box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.4);
} 

```

The code above was created by adapting the code in [Mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient) as shown below: 

```css
background: linear-gradient(#e66465, #9198e5);
background: linear-gradient(45deg, blue, red)

```

- The code was used by studying about linear-gradient CSS function and then implementing according to requirement of the assignment.

- I used the code because I wanted to implement the book shelf having a real visual of how actually the shelf looks like.

- I combined the above 2 linear-gradient functions provided and used background having gradient effect along with rotation at 30 degree.

### 2. filters.css

*Lines 161 - 168 and 185 - 189*

```css
.search-box input:not(:placeholder-shown):not(:focus)+label {
    opacity: 0;
    pointer-events: none;
}
...
...
.search-box input:not(:placeholder-shown)~#remove-search {
    opacity: 1;
    cursor: pointer;
    pointer-events: all;
}
```

The code above was created by adapting the code in [StackOverflow](https://stackoverflow.com/a/61130966) as shown below: 

```css
input:not(:placeholder-shown) {
  border: 1px solid red;
}
```

- The query was present on stackoverflow as ``` Detect if an input has text in it using CSS -- on a page I am visiting and do not control? ```. I skimmed through all the answers and used the best possible answer for my requirement.
- I had a requirement that the remove text button and search label should be visible and not visible based on the text present in the input box. 
- I modified the code to use specifically for label and remove-search icon in combination with *CSS selectors*.

### 3. FilterBtn.js, Search.js

*Lines 7 and 40 respectively*

```html
<!-- Filter Icon -->
<span id='filter-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="filter"><path d="M2 7h.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2H9.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2zm4-3a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm24 11h-.142a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h20.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-4 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4 7H19.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h10.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-14 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"></path></svg> </span>

<!-- Search Icon -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><g data-name="Layer 2"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search"></path></g></svg>

```
The code above was created by adapting the code in [Iconscout](https://iconscout.com/icons/cross) having multiple icons options. 


```html
<svg></svg>
```

- The icons code was present on the site available.
- I wanted to display the icons to make the UI user friendly.
- I modified the code by adding appropriate CSS on the ``HTML`` element.

### 4. FilterMenu.js

*Lines 25 and 47 respectively*

```js
 useEffect(() => {
        axios.get(`${backend_url}/books/genres`)
            .then(response => {
                if (response.data.status) {
                    const fetchedGenres = response.data.data.map(genre => genre.name);
                    setGenres(fetchedGenres);
                }
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });

        axios.get(`${backend_url}/books/authors`)
            .then(response => {
                if (response.data.status) {
                    const fetchedAuthors = response.data.data.map(author => author.name);
                    setAuthors(fetchedAuthors);
                }
            })
            .catch(error => {
                console.error("Error fetching authors:", error);
            });
    }, []);
```

The code above was created by adapting the code in [blog.logrocket](https://blog.logrocket.com/useeffect-react-hook-complete-guide/#:~:text=This%20may%20sound%20strange%20initially,UI%20because%20they%20run%20asynchronously) as shown below:
```js
 useEffect(() => {
    console.log("useEffect local storage");
    const persistedTitle = localStorage.getItem("title");
    setTitle(persistedTitle || []);
  }, []);
```

- The code was used to have an understanding on different use-case of useEffect Hook.
- I used the code because I wanted to make the call only once when the component mounts in React.
- I used the empty square brackets and called the genres and authors API to fetch all the available filters using axios.

## Backend

### 1. models/books.js

```js
// Multiple Authors - 
// Abhinav Acharya Tirumala Vinjamuri
// Ashish Nagpal
const Author = require('./author.js');
const Genre = require('./genre.js');
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    content_link: {
        type: String,
        required: true
    },
    publisherDate: {
        type: Date,
        required: true
    },
    // Mapping with Author Collection
    authorIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }],
    // Mapping with Genre Collection
    genreIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    }],
    book_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('books', BookSchema, 'books');

```

The code above was created by adapting the code in [medium.com](https://medium.com/@akhilanand.ak01/setup-a-basic-node-js-server-using-expressjs-mongoose-65f2a6dbfd58) article as shown below:


```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add more fields as per your product requirements
});

module.exports = mongoose.model('Product', productSchema);
```

- The code was used to revisit the concepts of using **mongoose** with **mongoDB** database and **nodeJs** server using ExpressJs.
- I used the code because I wanted to create schema using mongoose and map it to mongoDB collection.
- I used the reference to create books schema with different fields type along with referencing other collection using `ObjectId`.

# Workflow

## Frontend
When user visits the books library page, `BookLibrary` component is rendered. The component shows loader in form of skeleton books, whereas an API call is triggered to `/books/all` path for fetching books. The books are store in state with name `books`. When the user performs any type of filtering i.e filter selection, search or sort, a `useEffect` method is triggered to perform the action and update the state - `filteredBooks` accordingly.
```js
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
  ```


## Backend
As described in the application architecture of assignment 2, the backend server takes the **HTTP request** and forwards it to its respective **router**. In my feature, the request enters the `index.js` file and forwards it to the book router. The books router checks the API URL and calls the books controller for further execution. The controller file, where the business logic exists, interacts with the MongoDB database and returns the response of the request.

```js
// index.js Snippet
// Load routes
app.use('/late-fees', lateFeeRoute);
app.use('/notify', notificationsRoute);
app.use('/books', booksRoute); 
// .....
```

```js
// routes/books.js
// Ashish Nagpal
const express = require('express');
const bookController = require('../controllers/books');

const router = express.Router();

// API to fetch all books
router.get('/all', bookController.getAllBooks);

router.get('/genres', bookController.getAllGenres);

router.get('/authors', bookController.getAllAuthors);

module.exports = router;
```

```js
// controllers/books.js Snippet
// Ashish Nagpal
const Author = require('../models/author');
const Book = require('../models/books');
const Genre = require('../models/genre');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('authorIds').populate({ path: 'genreIds', model: 'Genre' });;

        console.log("Bookksss return", books);
        return res.status(200).json({
            message: "Books fetched successfully",
            data: books,
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false
        });
    }
};

// ....
```

# Image Credits
1. *Books on Wooden Shelves Inside Library* by Stanislav Kondratiev, visit https://www.pexels.com/photo/books-on-wooden-shelves-inside-library-2908984/

2. *Percy Jackson and the Olympians* by Rick Riordan visit https://www.readriordan.com/2022/02/15/cover-reveals-percy-jackson-and-the-olympians/

3. "Harry Potter and the Half-Blood Prince Book Cover" by Lordcolus is licensed under CC BY 2.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/2.0/?ref=openverse. 


# Acknowledgments
* I am grateful to the coding community for all of their hardwork in providing videos, articles and blogs related to web development. The materials provided served as a foundation for understanding and learning it's functionality and logic. 

* The valuable insights helped me in brushing up the skills and contributing efficiently towards the assignment. Their contribution is highly appreciated.