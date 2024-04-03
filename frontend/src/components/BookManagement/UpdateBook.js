// Author - Arihant Dugar
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from '../../util/config.js';
import { useNavigate, useParams } from "react-router-dom";
import "../../stylesheets/update-book.css";

function UpdateBook() {
    const { bookId } = useParams();
    const [validated, setValidated] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookAvailability, setBookAvailability] = useState('');
    const [contentLink, setContentLink] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [bookDescription, setBookDescription] = useState('');

    let navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchGenres = axios.get(`${backend_url}/books/genres`);
        const fetchAuthors = axios.get(`${backend_url}/books/authors`);
    
        Promise.all([fetchGenres, fetchAuthors])
            .then(([genresResponse, authorsResponse]) => {
                if (genresResponse.data.status) {
                    const fetchedGenres = genresResponse.data.data;
                    setGenres(fetchedGenres);
                }
                if (authorsResponse.data.status) {
                    const fetchedAuthors = authorsResponse.data.data;
                    setAuthors(fetchedAuthors);
                }
                // eslint-disable-next-line
                getBookDetail();
            })
            .catch(error => {
                console.error("Error fetching genres and authors:", error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBookDetail = async () => {
        try {
            const api = await axios.get(`${backend_url}/books/${bookId}`);
            if (api.data) {
                const bookDetailsData = api.data.data[0];
                setBookTitle(bookDetailsData.book_name);
                setBookGenre(bookDetailsData.genreIds[0]._id);
                setBookAuthor(bookDetailsData.authorIds[0]._id);
                setBookAvailability(bookDetailsData.availability === true ? 1 : 2);
                setContentLink(bookDetailsData.content_link);
                setBookPrice(bookDetailsData.price);
                setBookDescription(bookDetailsData.description);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            const bookData = {
                description: bookDescription,
                content_link: contentLink,
                authorIds: bookAuthor,
                genreIds: bookGenre,
                book_name: bookTitle,
                price: bookPrice,
                availability: bookAvailability === 1 ? true : false,
            };
            axios.put(`${backend_url}/books/update/`+bookId, bookData).then((response) => {
                navigate('/manage-books');
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    console.log("Error : " + error)
                }
            });
        }
        setValidated(true);
    };

    return (
        <div className="update-book-div">
          <Container className="update-form-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h1>Edit Book</h1>
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
              </Row>
              <Row>
                <Col md={12} className="btn-div">
                  <Button type="submit" className="submit-btn">Update</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      );;
}

export default UpdateBook;