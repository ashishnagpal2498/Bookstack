# CSCI 5709 Grp-13

Group project for 5709 Advanced Web services.

# Book Stack - v2

This version offers a comprehensive set of UI pages that provide contextual information about the application called `Book Stack` and its purpose.

## Authors

1. Member 1

   - [Arihant Dugar](arihant.dugar@dal.ca)
   - Branch Name:- [arihant-dugar](https://git.cs.dal.ca/anagpal/csci-5709-grp-13/-/tree/arihant-dugar?ref_type=heads)

## Description

This directory houses a stable deployment version of our application. The frontend is hosted on Netlify. Similarly, the backend is deployed on Render using a similar process. We have opted for MongoDB as our database solution.

## Links

1. Gitlab Repo: https://git.cs.dal.ca/anagpal/csci-5709-grp-13/-/tree/main?ref_type=heads
2. Frontend Deployment Link - Netlify: https://bookstack-csci-group-13.netlify.app/
3. Backend Deployment Link - Render: https://bookstack-grp13.onrender.com

## Files Authored

- frontend/src/components/BookManagement/*
- frontend/src/components/Navbar/*
- frontend/src/components/Details/ContactUs.js
- frontend/src/components/Details/Faq.js
- frontend/src/components/Details/About.js
- frontend/src/firebaseConfig.js
- frontend/src/stylesheets/add-book.css
- frontend/src/stylesheets/book-manager.css
- frontend/src/stylesheets/manage-reservations.css
- frontend/src/stylesheets/update-book.css
- frontend/src/stylesheets/header-nav.css
- frontend/src/stylesheets/home.css
- frontend/src/stylesheets/contactus.css
- backend/controllers/books.js
- backend/controllers/reservations.js
- backend/routes/books.js
- backend/routes/reservations.js
- backend/models/books.js


## Book Management

For the feature `Book management` in Bookstack, the interface would provide administrators 
with the necessary tools to efficiently manage the inventory of books available on the platform.
Empower administrators to efficiently manage the book inventory by adding, deleting, and 
updating availability, ensuring a well-maintained and up-to-date collection. 


## Tasks

### Manage Books:

- This task involves the management of all books within the Book Stack application. It includes functionalities such as viewing, editing, and deleting books from the system. Admin can search book from the list of books as well.

### Add Book:

- Admin can add new books using this functionality. They need to input essential details such as book title, author, genre, description, etc., to successfully add a book.

### Delete Book:

- With this feature, admin can delete books. Deleting a book removes it permanently from the system.

### Update Book:

- This task enables admin to update the details of existing books. Admin can modify information such as the book title, author, genre, description, etc., as needed.

### Update Reservation on Book Return:

- When a user returns a reserved book, this functionality helps admin update the reservation status of the book accordingly. It ensures that the book becomes available for reservation by other users.

### Apply Late Fees for Book:

- This task involves the application of late fees for books that are returned past their due date. Users are notified of the late fee and required to settle the amount before further borrowing privileges are granted.

## Project Structure

The project is structured into frontend and backend components:

### Frontend Components
  - `AddBook.js`:  Manages the addition of new books to the Book Stack application. Allows admin to input book details such as title, author, genre, description, etc.
  - `BookManager.js` : Handles the management of all books within the Book Stack application. Provides functionalities for search, viewing, editing, and deleting books from the system.
  - `ManageBookReservations.js` :  Manages book reservations within the application. Allows admin to update the book status if returned and apply late fees if book is due.
  - `UpdateBook.js` :  Manages the updating of book details in the Book Stack application. Provides a form for admin to modify existing book information.
  - `Navbar.js` : Navigation bar for the application.
  - `ContactUs.js` : Provides a contact form or information for users to get in touch with the application administrators or support team.
  - `About.js` : Displays information about the Book Stack application, its purpose, and any relevant details about its development.
  - `Faq.js` : Provides a Frequently Asked Questions (FAQ) section with answers to common queries related to the Book Stack application.
  - `firebaseConfig.js` : Configuration file for Firebase storage.

### Backend Components
  - `backend/controllers/books.js` : Contains controller functions responsible for handling book-related operations, such as adding new books, updating existing books, deleting books, and fetching book details from the database.
  - `backend/controllers/reservations.js` : Houses controller functions for managing book reservation operations, including creating reservations, updating reservation status, deleting reservations, and retrieving reservation information.
  - `backend/routes/books.js` : Defines the routes for book-related API endpoints, directing requests to the appropriate controller functions defined in books.js for processing.
  - `backend/routes/reservations.js` :  Defines the routes for reservation-related API endpoints, directing requests to the corresponding controller functions in reservations.js for handling reservation operations.
  - `backend/models/books.js` : Contains the book schema and model definition, specifying the structure of book data stored in the database.


## Built With

1. [React](https://legacy.reactjs.org/docs/getting-started.html/) - JavaScript library for building user interfaces
2. [npm](https://docs.npmjs.com//) - Package manager
3. [React Bootstrap](https://react-bootstrap.netlify.app/) - Frontend framework for building responsive web applications
4. [NodeJS](https://nodejs.org/en) - JavaScript runtime environment for server-side development
5. [ExpressJS](https://expressjs.com/) - Web application framework for Node.js, used for building RESTful APIs


## References

1. “Netlify app,” Netlify.com. [Online]. Available: https://app.netlify.com . [Accessed: 03-
Apr-2024].
2. "FreePik," Frepik. [Online]. Available: https://www.freepik.com/. [Accessed: 03-Apr-2024]"
3. "React bootstrap," Netlify.app. [Online]. Available: https://react-bootstrap.netlify.app/. [Accessed: 03-Apr-2024].
4. A. Srikanth, "Creating a REST API with Node.Js and express," Postman Blog, 22-May-2023. [Online]. Available: https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/. [Accessed: 03-Apr-2024].
