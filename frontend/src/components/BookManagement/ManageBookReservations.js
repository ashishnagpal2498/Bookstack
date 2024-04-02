// Author - Arihant Dugar
import "../../stylesheets/manage-reservations.css";
import { Modal, Card, Button, Row, Col, Container, Form, Alert } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from '../../util/config';

function ReservationCard({ reservation, onStatusUpdate }) {

    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleUpdate = () => {
        setShowModal(true);
    };

    const confirmUpdate = () => {
        onStatusUpdate(reservation.reservation_id, reservation.book_id);
        setShowModal(false);
    };

    const handleClose = () => setShowModal(false);

    const handleApplyLateFees = async () => {
        try {
            const reservationData = {
                user_id: reservation.user_id,
                book_id: reservation.book_id,
                reserved_date: reservation.reservation_date,
            }
            const response = await axios.post(`${backend_url}/late-fees/create`, reservationData);
            if (response.status === 200) {
                console.log('Late fees applied successfully:', response.data);
                setShowSuccessMessage(true);

                window.setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
                
            } else {
                console.error('Failed to apply late fees:', response.data);
                setShowErrorMessage(true);
                window.setTimeout(() => {
                    setShowErrorMessage(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error applying late fees:', error.message);
            setShowErrorMessage(true);
        }
    }

    return (
        <>
            <Card id={"reservation-"+reservation.reservation_id} className="reservation-cards">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                    <img src={reservation.book_picture} alt={reservation.book_name} className="mr-3" style={{ maxWidth: '60px', maxHeight: '65px' }} />
                        <div>
                            <Card.Title>{reservation.book_name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{reservation.user_name}</Card.Subtitle>
                        </div>
                    </div>
                    <div>
                        <Button className="me-2 return-btn" onClick={handleUpdate}>Process Return</Button>
                        <Button variant="danger" onClick={handleApplyLateFees}>Apply Late Fee</Button>
                    </div>
                </Card.Body>
            </Card>
            <Modal id="return-confirmation" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Book Return</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to process return?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary cancel-btn" onClick={handleClose}>
                        No, Cancel
                    </Button>
                    <Button variant="primary return-btn" onClick={confirmUpdate}>
                        Yes, Process Return
                    </Button>
                </Modal.Footer>
            </Modal>
            <Alert style={{ width: '25%', position: "absolute", top: 30, right: 10, zIndex: 999 }} variant="danger" onClose={() => setShowErrorMessage(false)} show={showErrorMessage} dismissible>
                <p>
                    Error applying late fees!
                </p>
            </Alert>
            <Alert style={{ width: '25%', position: "absolute", top: 30, right: 10, zIndex: 999 }} variant="success" onClose={() => setShowSuccessMessage(false)} show={showSuccessMessage} dismissible>
                <p>
                    Late fee applied successfully!
                </p>
            </Alert>
        </>
    );
}

function ManageBookReservations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        axios.get(`${backend_url}/reservations/all`)
        .then(response => {
            if (response.data.users) {
                setReservations(response.data.users)
            }
        })
        .catch(error => {
            console.error("Error fetching reservations:", error);
        });
      }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusUpdate = async (reservationId, bookId) => {
        try {
            const response = await axios.put(`${backend_url}/reservations/update/${reservationId}/${bookId}`);
            if (response.status === 200) {
                console.log('Book reservation updated successfully:', response.data);
            } else {
                console.error('Failed to update book reservation:', response.data);
            }
        } catch (error) {
            console.error('Error updating book reservation:', error.message);
        }
        setReservations(reservations.filter(reservation => reservation.reservation_id !== reservationId && reservation.book_id !== bookId));
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.book_name.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

  return (
    <div className="manage-reservations-div">
        <Container>
            <Row className="mb-3" id="search-div">
                <Col>
                    <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
                </Col>
            </Row>
            <Row>
                {filteredReservations.map((reservation, index) => (
                    <ReservationCard key={reservation.reservation_id} reservation={reservation} onStatusUpdate={handleStatusUpdate} />
                ))}
            </Row>
        </Container>
    </div>
  );
}

export default ManageBookReservations;