// Author - Arihant Dugar
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import uploadIcon from "../../assets/upload-icon.png";
import "../../stylesheets/add-book.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backend_url } from '../../util/config.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebaseConfig.js"

function AddBook() {
  const [validated, setValidated] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookAvailability, setBookAvailability] = useState('');
  const [contentLink, setContentLink] = useState('');
  const [bookPrice, setBookPrice] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookCoverImg, setBookCoverImg] = useState('');


  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get(`${backend_url}/books/genres`)
      .then(response => {
        if (response.data.status) {
          const fetchedGenres = response.data.data;
          setGenres(fetchedGenres);
        }
      })
      .catch(error => {
        console.error("Error fetching genres:", error);
      });

    axios.get(`${backend_url}/books/authors`)
      .then(response => {
        if (response.data.status) {
          const fetchedAuthors = response.data.data;
          setAuthors(fetchedAuthors);
        }
      })
      .catch(error => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  let navigate = useNavigate();

  const handleFiles = (files) => {
    const file = files[0];
    setBookCoverImg(file);
    setBookCoverImg(file);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

        if (bookCoverImg) {
          const storageRef = ref(storage, `/files/${bookCoverImg.name}`)
          const uploadTask = uploadBytesResumable(storageRef, bookCoverImg);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                const bookData = {
                  description: bookDescription,
                  content_link: contentLink,
                  authorIds: bookAuthor,
                  genreIds: bookGenre,
                  book_name: bookTitle,
                  image_url: url,
                  price: bookPrice,
                  availability: bookAvailability === 1 ? true : false,
                };
                axios.post(`${backend_url}/books/add`, bookData).then((response) => {
                  navigate('/manage-books');
                }).catch((error) => {
                  if (error.response && error.response.status === 401) {
                    console.log("Error : " + error);
                  }
                });
              });
            }
          );
        }

        if (bookCoverImg) {
          const storageRef = ref(storage, `/files/${bookCoverImg.name}`)
          const uploadTask = uploadBytesResumable(storageRef, bookCoverImg);

          await uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                const bookData = {
                  description: bookDescription,
                  content_link: contentLink,
                  authorIds: bookAuthor,
                  genreIds: bookGenre,
                  book_name: bookTitle,
                  image_url: url,
                  price: bookPrice,
                  availability: bookAvailability
                }
                axios.post(`${backend_url}/books/add`, bookData).then((response) => {
                  navigate('/manage-books');
                }).catch((error) => {
                  if (error.response && error.response.status === 401) {
                    console.log("Error : " + error)
                  }
                });
              });
            }
          );
        }
      }
      setValidated(true);
  };

  return (
    <div className="add-book-div">
      <Container className="add-form-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h1>Add Book</h1>
          <Row>
            <Col md={6}>
              <Form.Group controlId="book-title">
                <Form.Label><h4>Book Title</h4></Form.Label>
                <Form.Control type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required isInvalid={validated && !bookTitle} />
                <Form.Control.Feedback type="invalid">Please provide a book title.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="book-genre">
                <Form.Label><h4>Genre</h4></Form.Label>
                <Form.Select value={bookGenre} onChange={(e) => setBookGenre(e.target.value)} required isInvalid={validated && !bookGenre}>
                  <option value="">Select Genre</option>
                  {genres.map(genre => (
                    <option key={genre._id} value={genre._id}>{genre.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a genre.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="book-author">
                <Form.Label><h4>Book Author</h4></Form.Label>
                <Form.Select value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} required isInvalid={validated && !bookAuthor}>
                  <option value="">Select Author</option>
                  {authors.map(author => (
                    <option key={author._id} value={author._id}>{author.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select author.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="book-availability">
                <Form.Label><h4>Availability</h4></Form.Label>
                <Form.Select value={bookAvailability} onChange={(e) => setBookAvailability(e.target.value)} required isInvalid={validated && !bookAvailability}>
                  <option value="">Select Availability</option>
                  <option value="1">Available</option>
                  <option value="2">Unavailable</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select availability.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="content-link">
                <Form.Label><h4>Content Link</h4></Form.Label>
                <Form.Control type="text" value={contentLink} onChange={(e) => setContentLink(e.target.value)} required isInvalid={validated && !contentLink} />
                <Form.Control.Feedback type="invalid">Please provide the content link.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="book-price">
                <Form.Label><h4>Book Price</h4></Form.Label>
                <Form.Control type="text" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} required isInvalid={validated && !bookPrice} />
                <Form.Control.Feedback type="invalid">Please provide a book price.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="book-description">
                <Form.Label><h4>Description</h4></Form.Label>
                <Form.Control as="textarea" rows={6} value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} required isInvalid={validated && !bookDescription} />
                <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="image-div" controlId="book-cover-img">
                <h4>Cover Image</h4>
                <div className="upload-div">
                  <Form.Control
                    className="file-input"
                    type="file"
                    id="book-cover-img"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <img src={uploadIcon} width="60" height="58" alt="Upload Icon" /><br />
                  <Form.Label htmlFor="book-cover-img">Drag & Drop book image or <span className="highlighted-text">Browse</span></Form.Label>
                  <br />Supported formats: JPEG, PNG
                  <br /><br /><div id="selectedFileName">{bookCoverImg.name}</div>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="btn-div">
              <Button type="submit" className="submit-btn">Add Book</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}


export default AddBook;
