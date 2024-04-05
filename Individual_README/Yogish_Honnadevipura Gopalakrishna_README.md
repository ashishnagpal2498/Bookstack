# Bookstack

##  Feature Overview

 The application features user authentication, registration, and profile management functionalities. Users can log in, register for an account, update their profile information, and reset their password if needed. The application also allows users to upload a profile picture.

## Files

backend/controllers/userAuth.js
backend/middlware/multer.js
backend/models/users.js
backend/routes/userAuth.js
backend/util/cloudinaryService.js
frontend/components/Login.js
frontend/components/Profile.js
frontend/components/Register.js
frontend/components/ResetPassword.js
frontend/components/SendEmailPR.js

## Login Details for testing

### Admin login credentials
- Username: abhinava465@gmail.com
- Password: securepassword

### Reader login credentials
- Username: ab806657@dal.ca
- Password: pass@1234

## Tasks

### Login
- Users can log in to their account using their email and password.
- Form validation ensures that the entered email is in a valid format and that the password meets specific criteria (minimum length, alphanumeric characters, etc.).
- Upon successful login, users are redirected to their profile page.

### Registration
- Users can register for a new account by providing their first name, last name, email, phone number, password, and confirm password.
- Form validation checks if the entered information meets the required criteria (e.g., valid email format, password complexity).
- Upon successful registration, users are redirected to the login page.
- Users will assume a role of 'user' by default.

### Profile
- Users can view and edit their profile information, including their first name, last name, email, and phone number.
- The profile page includes an option to upload a new profile picture.
- Users can delete their account, which requires confirmation.

### Password Reset
- Users who forget their password can request a password reset link by entering their registered email address.
- Form validation checks if the entered email is in a valid format.
- Upon successful submission, users receive a reset email with instructions on how to reset their password.

## Project Structure

The project is structured into frontend and backend components:

- **Frontend Components**
  - `Login.js`: Handles user authentication.
  - `Register.js`: Manages user registration.
  - `Profile.js`: Manages user profile information and picture upload.
  - `ResetPassword.js`: Handles password reset functionality.
  - `SendEmailPR.js`: Facilitates sending reset password emails.

- **Backend Components**
  - `userAuth.js`: Handles user authentication logic.
  - `multer.js`: Middleware for file uploads.
  - `users.js`: Defines the user model.
  - `userAuth.js`: Defines routes for user authentication.
  - `cloudinaryService.js`: Handles Cloudinary integration for image uploads.

## Deployment

- **Gitlab Repo**:https://git.cs.dal.ca/anagpal/csci-5709-grp-13.git
- **Frontend Deployment Link (Netlify)**: https://bookstack-csci-group-13.netlify.app/
- **Backend Deployment Link (Render)**: https://bookstack-grp13.onrender.com

## Authors

- **Yogish Honnadevipura Gopalakrishna**
- **Banner ID: B00928029**
