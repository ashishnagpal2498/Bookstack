// Author - Arihant Dugar
import React from 'react';
import '../../stylesheets/faq.css';
import { Container, Row, Accordion } from 'react-bootstrap';
import faqIllustration from "../../assets/faq.png";

const Faq = () => {


    return (
        <div className="faq-div">
            <Container className='contact-us-container'>
                <Row>
                    <div className='col-lg-6 col-md-12'>
                    <img src={faqIllustration} alt="Contact us"/>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <h3>FAQ</h3>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>How to use the Book Stack application?</Accordion.Header>
                                <Accordion.Body>
                                    Using our app is really easy! Simply sign up for an account using your email, first & last names, phone number, and password. Once logged in, you can explore our book library, search for specific books or genres, view specific details of the book including summaries and reviews, and reserve books for borrowing.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Is there a limit to the number of books I can borrow?</Accordion.Header>
                                <Accordion.Body>
                                    There is no such limit to the number of books you can borrow on Book Stack!
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>How long can I borrow a book for?</Accordion.Header>
                                <Accordion.Body>
                                    We are quite flexible with book borrowing. Typically, we allow our users to borrow a book for 14 days. However, if you do not return it by the due date, the book gets auto renewed for another 12 days. Though, a book can only be auto-renewed once, after which, the late fees would be levied.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>How can I reserve a book on Book Stack?</Accordion.Header>
                                <Accordion.Body>
                                    This is pretty straightforward! You can just search the book you are interested in borrowing, add it to the cart, and follow the checkout procedure. Once our team confirms, you'll receive a notification for the same.  You can then pick it up from your nearest library having a partnership with our application at your convenience.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>How can I suggest a book to be added to Book Stack?</Accordion.Header>
                                <Accordion.Body>
                                    We would love to hear your suggestions! You can do so by simply contacting our support team through the 'Contact Us' option. Our team will review it at the earliest and work to add it to our library if possible.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Faq;
