// Author - Arihant Dugar
import "../../stylesheets/book-manager.css";
import { Modal, Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from '../../util/config';
import {useNavigate} from "react-router-dom";

function BookCard({ book, author, onDelete }) {

    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete(book._id);
        setShowModal(false);
    };

    const handleEdit = () => {
        navigate('/update-book/'+ book._id);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card id={"book-"+book._id} className="book-cards">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                    <img src={book.image_url} alt={book.book_name} className="mr-3" style={{ maxWidth: '60px', maxHeight: '65px' }} />
                        <div>
                            <Card.Title>{book.book_name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                        </div>
                    </div>
                    <div>
                        <Button className="me-2 edit-btn" onClick={handleEdit}>Edit</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal id="delete-confirmation" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary cancel-btn" onClick={handleClose}>
                        No, Cancel
                    </Button>
                    <Button variant="primary delete-btn" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function BookManager() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get(`${backend_url}/books/all`)
        .then(response => {
            if (response.data.status) {
                setBooks(response.data.data)
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
      }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${backend_url}/books/delete?id=${id}`);
            if (response.status === 200) {
                console.log('Book deleted successfully:', response.data);
            } else {
                console.error('Failed to delete book:', response.data);
            }
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
        setBooks(books.filter(book => book._id !== id));
    };

    const filteredBooks = books.filter(book =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

  return (
    <div className="book-manager-div">
        <Container>
            <Row className="mb-3" id="search-div">
                <Col>
                    <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                </Col>
                <Col xs="auto">
                    <Button className="add-book-btn" href="/add-book">Add Book</Button>
                </Col>
            </Row>
            <Row>
                {filteredBooks.map((book, index) => (
                    <BookCard key={book.id} book={book} author={authors.filter(author => author._id === book.authorIds[0]._id)[0].name} onDelete={handleDelete}/>
                ))}
            </Row>
        </Container>
    </div>
  );
}

export default BookManager;