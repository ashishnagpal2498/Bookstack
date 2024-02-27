import "../../stylesheets/book-manager.css";
import { Modal, Card, Button, Row, Col, Container, Form } from 'react-bootstrap';
import bookIcon from '../../assets/book-cover-1.png';
import { useState } from "react";

function BookCard({ book, onDelete }) {
    const { id, name, author } = book;

    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete(id);
        setShowModal(false);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Card id={"book-"+id} className="book-cards">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img src={bookIcon} alt={name} className="mr-3" style={{ maxWidth: '60px' }} />
                        <div>
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button className="me-2 edit-btn">Edit</Button>
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
                    <Button variant="outline-primary" onClick={handleClose}>
                        No, Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function BookManager() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([
        {
            id: "1",
            name: "Percy Jackson - The Lightning Thief",
            author: "Rick Riordan",
        },
        {
            id: "2",
            name: "Percy Jackson - The Sea of Monsters",
            author: "Rick Riordan",
        }
    ]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <BookCard key={book.id} book={book} onDelete={handleDelete}/>
                ))}
            </Row>
        </Container>
    </div>
  );
}

export default BookManager;