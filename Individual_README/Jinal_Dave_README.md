# CSCI 5709 - Group 13
# Assignment 3

* *Date Created*: 03 Apr 2024
* *Last Modification Date*: 03 Apr 2024
* *Assignment Instruction URL*: https://dal.brightspace.com/d2l/le/content/311813/viewContent/4041434/View
* *Project URL(Git Lab)*: https://git.cs.dal.ca/anagpal/csci-5709-grp-13
* *Frontend - Deployment Link*: https://bookstack-csci-group-13.netlify.app/
* *Backend - Deployment Link*: https://bookstack-grp13.onrender.com
* *Code Repository (Individual Branch)* - https://git.cs.dal.ca/anagpal/csci-5709-grp-13/-/tree/jinal-dave?ref_type=heads

## Authors

* [Jinal Dave](jn270099@dal.ca) - *Developer*

## List of Files Created As A Part of My Assignment
- books.js : backend/controllers/books.js
- books.js : backend/models/books.js
- books.js : backend/routes/books.js
- App.css : frontend/src/stylesheets
- BookDetail.js : frontend/src/components/Books/BookDetail.js
- Recommended.js : frontend/src/components/Books/Recommended.js

## Description of Developed Features and Associated Tasks
### 1. Book Detail: 
This feature shows the detailed view of the book that is clicked by the reader from the listing screen under 'Books' option of nav bar. A user can see the full book details by clicking on the option under "About" section. This page also shows a section of recommendations that will list similar books. The reader can navigate back and forth from the book detail screen to the book recommendation screen. For easy usability, the pagination option is included. Below are the tasks included within this feature: 
- View Book detail: To show all related details of the book; such as book name, description, author, etc. When the user is logged in and they have a late-fees associated, they won't be able to see the reserve button below the book image.
- Similar recommendations: This section is enclosed within the bottom part of the page where the similar book to the current one is shown.
- View Rating & review: A reader can get better insights about the book content by checking the associated ratings and reviews for the currently viewing book using this option lablled as "View Rating and Review". The relevant sorting options are included for checking the most recent and the most relevant reviews.  

### 2. Book Feedback: 
This is another feature linked within the  book details page where users can share their reading experience with the rest of the community by adding reviews or rating to it. Following are the tasks included within this: 
- Reviews: A reader can submit their comment regarding the currently opened book using the input option available under "Do you want to rate and review this book?".
- Rating: A reader can also rate a book using the same section and submit the details. 

## Login Details for testing
### Reader's Login Credentials
- Username: ab806657@dal.ca
- Password: pass@1234

## Getting Started

### Prerequisites

#### To work on a local copy of this assignment, I cloned the [project repository](https://git.cs.dal.ca/anagpal/csci-5709-grp-13) and switched to my branch named ''jinal-dave''. I had completed the front-end of both of my features with A1 assignment and I have implemented the backend as a part of my A3 assignment.

* Node.js - [Download Link](https://nodejs.org/en/download)
* Visual studio code - [Download Link](https://code.visualstudio.com/download)
* GIT - [Download Link](https://git-scm.com/downloads)
* Netlify account

See the following section for detailed step-by-step instructions on how to run this assignment in local machine.

### Running the local copy

In the project directory, open a terminal and use below command:

### `npm install`

It will install the node_modules and related dependencies to the project. The next step is to set up the environment variables for the ".env.example" file

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Deployment
- The front-end is deployed through Netlify (https://bookstack-csci-group-13.netlify.app/) and the backend is deployed through render (https://bookstack-grp13.onrender.com)


## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html) 
* [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) 
* [npm](https://docs.npmjs.com//) 
* [NodeJS](https://nodejs.org/en) 
* [ExpressJS](https://expressjs.com/) 


## Sources Used

### Adding Bootstrap

The bootstrap design framework has been installed to the project using below commands:

```
npm install bootstrap
```

* Reference Document link : [Adding Bootstrap](https://create-react-app.dev/docs/adding-bootstrap/)

### BookDetail.js

*Lines 154-159, 242-249*

```
<Button
 onClick={() => callReservation()}
  className="resever-btn"
>
  Reserve
</Button>
...
<Button
  onClick={() => {
    addRating();
  }}
  className="resever-btn"
>
  Submit
</Button>                          

```

The code above was created by adapting the code in [Bootstrap Button](https://getbootstrap.com/docs/4.0/components/buttons/) after thoroughly studying the original source as shown below: 

```
<button class="btn btn-primary" type="submit">Button</button>

```

- [Bootstrap Buttons](https://getbootstrap.com/docs/4.0/components/buttons/)'s code is used as reference to create button designs.

### BookDetail.js

*Lines 469-632*

```
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

```

The code above was created by adapting the code in [Bootsrap Modal](https://getbootstrap.com/docs/4.0/components/modal/) as shown below: 

```
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

```

- [Bootsrap Modal](https://getbootstrap.com/docs/4.0/components/modal/)'s Code was used for the modal popup design to keep the consistency of bootsrap design and responsiveness by thoroughly studying and understanding the concept and logic.
- [FA Icons](https://fontawesome.com/v4/icons/)'s Code was used to show the fonts and icons.
- [FortAwesome Icons](https://docs.fontawesome.com/web/setup/get-started)'s code was used to show fonts.

### BookDetail.js

*Lines 170-178, 207-216*

```
<Rating
 stop={5}
 initialRating={ratingRatio}
 emptySymbol={
   <FontAwesomeIcon
     icon={regularStar}
     size="1x"
     className="medium"
   />  
  ...
   <Rating
stop={5}

initialRating={rating}
emptySymbol={
  <FontAwesomeIcon
    icon={regularStar}
    size="1x"
    className="medium"
  />                    

```

The code above was created by adapting the code in [Reacting Rating](https://www.npmjs.com/package/react-rating) after thoroughly studying the original source as shown below: 

```
<Rating />

```

- [React Rating](https://www.npmjs.com/package/react-rating)'s code is used as reference to create rating designs.

### BookDetail.js

*Line 119*

```
toast.success("Review added successfully.");                  

```

The code above was created by adapting the code in [Toast messages in react tutorial](https://www.geeksforgeeks.org/reactjs-toast-notification/) after thoroughly studying the original source as shown below: 

```
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
toast.configure();
function GeeksforGeeks() {
    const notify = () => {
        // inbuilt-notification
        toast.warning("Danger");
        // inbuilt-notification
        toast.success("successful");
        // inbuilt-notification
        toast.info("GeeksForGeeks");
        // inbuilt-notification
        toast.error("Runtime error");
        // default notification
        toast("Hello Geeks");
    };
    return (
        <div className="GeeksforGeeks">
            <button onClick={notify}>Click Me!</button>
        </div>
    );
}
export default GeeksforGeeks;

```

- [Toast messages in react tutorial](https://www.geeksforgeeks.org/reactjs-toast-notification/) 's Code was used as reference to create a toast success/error messages.

### BookDetail.js

*Line 88, 117*

```
        const api = await axios.get(`${backend_url}/books/${bookId}`);
...
        const api = await axios.post(backend_url + "/books/rating", data);

```

The code above was created by adapting the code in [Axios In React tutorial](https://www.freecodecamp.org/news/how-to-use-axios-with-react/) after thoroughly studying the original source as shown below: 

```
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}

```

- [Axios In React tutorial](https://www.freecodecamp.org/news/how-to-use-axios-with-react/) 's Code was used as reference to create a axios post request.

### Recommended.js

*Lines 89-104*

```
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

```

The code above was created by adapting the code in [Reacting Paginate](https://www.npmjs.com/package/react-paginate) after thoroughly studying the original source as shown below: 

```
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
ReactDOM.render(
  <PaginatedItems itemsPerPage={4} />,
  document.getElementById('container')
);

```

- [React Paginate](https://www.npmjs.com/package/react-paginate)'s code is used as reference to create paginate designs.

### Recommended.js

*Lines 45-52*

```
 <Button
            className="m-4"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </Button>               

```

The code above was created by adapting the code in [Bootstrap Button](https://getbootstrap.com/docs/4.0/components/buttons/) after thoroughly studying the original source as shown below: 

```
<button class="btn btn-primary" type="submit">Button</button>

```

- [Bootstrap Buttons](https://getbootstrap.com/docs/4.0/components/buttons/)'s code is used as reference to create button designs.


### Recommended.js

*Line 29*

```
const api = await axios.get(backend_url + "/books/all");

```

The code above was created by adapting the code in [Axios In React tutorial](https://www.freecodecamp.org/news/how-to-use-axios-with-react/) after thoroughly studying the original source as shown below: 

```
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}

```

- [Axios In React tutorial](https://www.freecodecamp.org/news/how-to-use-axios-with-react/) 's Code was used as reference to create a axios post request.

