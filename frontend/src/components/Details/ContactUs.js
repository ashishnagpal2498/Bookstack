// Authors : [ Arihant Dugar ]
import React, { useState } from 'react';
import '../../stylesheets/contactus.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import contactIllustration from "../../assets/contact-us.png";
import checkedIcon from "../../assets/checked.png";
import { useNavigate } from "react-router-dom";

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
    var fieldsInvalid = false;
    if (!isEmailValid(email)){
      setValidated(false);
      fieldsInvalid = true;
    }
    if (!isNameValid(fullName)){
      setValidated(false);
      fieldsInvalid = true;
    }
    if (!isPhoneValid(phone)){
      setValidated(false);
      fieldsInvalid = true;
    }
    if (fieldsInvalid){
      return;
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowConfirmation(true);
    }
    setValidated(true);
  }

  const isEmailValid = (email) => {
    // Use a more comprehensive regex pattern for email validation
    const VALIDEMAIL = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return VALIDEMAIL.test(email);
  };

  const checkEmail = () => {
    return (email.trim() !== '' && !isEmailValid(email));
  };

  const isNameValid = (name) => {
    // Use a more comprehensive regex pattern for email validation
    const VALIDNAME = /^[A-Za-z ]+$/;
    return VALIDNAME.test(name);
  };

  const checkName = () => {
    return (fullName.trim() !== '' && !isNameValid(fullName));
  };

  const isPhoneValid = (phone) => {
    // Use a more comprehensive regex pattern for email validation
    const VALIDPHONE = /[0-9]{10}/;
    return VALIDPHONE.test(phone);
  };

  const checkPhone = () => {
    return (phone.trim() !== '' && !isPhoneValid(phone));
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    navigate('/');
  }

  return (
    <div className="contact-us-div">
      <Container className='contact-us-container'>
        <h2>Contact Us</h2>
        <Row>
          <div className='col-lg-6 col-md-12'>
            <img src={contactIllustration} alt="Contact us" />
          </div>
          <div className='col-lg-6 col-md-12'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="full-name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required isInvalid={checkName()} />
                    <Form.Control.Feedback type="invalid">Please enter your full name. (Name cannot contain numbers or special characters)</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} required isInvalid={checkEmail()} />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address. (name@domain.subdomain)</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="phone-number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required isInvalid={checkPhone()} />
                    <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
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
          </div>
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
