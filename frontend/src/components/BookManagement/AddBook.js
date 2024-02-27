import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import uploadIcon from "../../assets/upload-icon.png";
import "../../stylesheets/add-book.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function AddBook() {
  const [validated, setValidated] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookAvailability, setBookAvailability] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookCoverImg, setBookCoverImg] = useState('');
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        navigate('/manage-books');
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
                    <option value="1">Fiction</option>
                    <option value="2">Non-Fiction</option>
                    <option value="3">Mystery</option>
                    <option value="4">Historical</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Please select a genre.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="book-author">
                  <Form.Label><h4>Book Author</h4></Form.Label>
                  <Form.Control type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} required isInvalid={validated && !bookAuthor} />
                  <Form.Control.Feedback type="invalid">Please provide a book author.</Form.Control.Feedback>
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
                    <img src={uploadIcon} width="60" height="58" alt="Upload Icon" /><br />
                    <Form.Label htmlFor="book-cover-img">Drag & Drop product image or <span className="highlighted-text">Browse</span></Form.Label>
                    <Form.Control type="file" id="book-cover-img" accept=".png, .jpg, .jpeg" style={{ display: 'none' }} value={bookCoverImg} onChange={(e) => setBookCoverImg(e.target.value)} />
                    <br />Supported formats: JPEG, PNG
                    <br /><br /><div id="selectedFileName"></div>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="btn-div">
                <Button type="submit" className="submit-btn">Add Product</Button>
              </Col>
            </Row>
          </Form>
        </Container>
    </div>
  );
}

export default AddBook;
