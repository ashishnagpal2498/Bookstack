import React, { useState } from 'react';
import '../../stylesheets/contactus.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import contactIllustration from "../../assets/contact-us.png";
import checkedIcon from "../../assets/checked.png";
import {useNavigate} from "react-router-dom";

const ContactUs = () => {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
        setShowConfirmation(true);
    }
    setValidated(true);
  }

  const handleModalClose = () => {
    setShowConfirmation(false);
    navigate('/');
  }

  return (
    <div className="contact-us-div">
      <Container className='contact-us-container'>
          <Row>
            <Col>
              <img src={contactIllustration} alt="Contact us"/>
            </Col>
            <Col>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="full-name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required isInvalid={validated && !fullName} />
                      <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required isInvalid={validated && !email} />
                      <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="phone-number">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required isInvalid={validated && !phone} />
                      <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="message">
                      <Form.Label><h4>Message</h4></Form.Label>
                      <Form.Control as="textarea" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required isInvalid={validated && !message} />
                      <Form.Control.Feedback type="invalid">Please provide a message or description.</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" className="submit-btn">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
      </Container>
      <Modal
        show={showConfirmation}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className='modal-img-div'>
            <img className='confirmation-img' src={checkedIcon} alt='confirmation' />
          </div>
          <p>
            <h4>Awesome!</h4>
            You're response has been recorded and our team will reach out to you soon.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='col-sm-4 form-close-btn' onClick={() => handleModalClose()}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactUs;
