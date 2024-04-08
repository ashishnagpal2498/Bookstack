// Authors - [Arihant Dugar]
import { React } from 'react'
import '../../stylesheets/header-nav.css'
import { localStorageUtil, isAdmin } from '../../util';
import { NavDropdown, Row, Col, Container, Button, Navbar, Nav } from 'react-bootstrap';
import profileIcon from '../../assets/profile.png';
import logo from '../../assets/logo.png';

function CommonNavbar({ user, setUser, admin }) {

    const logout = () => {
        setUser(null);
        localStorageUtil.removeItem('user');
    }

    return (
        <Navbar expand="lg" className="top-nav" data-bs-theme="light">
            <Container className='min-w-full px-4'>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Book Stack
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/books">Books</Nav.Link>
                        <Nav.Link href="/favorites">Favorites</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/contactus">Contact Us</Nav.Link>
                        <Nav.Link href="/faq">FAQ</Nav.Link>
                        
                        {(user) ? <Nav.Link href="/latefee">Late Fee System</Nav.Link> : <></>}
                        {(user && isAdmin()) ?
                            <Nav.Link href="/manage-books">Book Management</Nav.Link> : <></>}
                        {(user && isAdmin()) ?
                            <Nav.Link href="/manage-reservations">Manage Reservations</Nav.Link> : <></>}
                            {(user) ? <Nav.Link href="/cartdetails">Cart</Nav.Link> : <></>}
                        {

                            user ?
                        
                                <NavDropdown className="ms-auto"
                                    title={user.name}
                                    id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#coming-soon">
                                        <Row>
                                            <Col xs={3}>
                                                <img src={profileIcon} alt="" />
                                            </Col>
                                            <Col xs={6}>
                                                <Row>{user.name}</Row>
                                                <Row>{user.email}</Row>
                                            </Col>
                                        </Row>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/profile">Profile Settings</NavDropdown.Item>
                                    {(user && isAdmin()) ?
                                        <NavDropdown.Item href="/manage-books">
                                            Book Management
                                        </NavDropdown.Item> : <></>}
                                    {(user && isAdmin()) ?
                                        <NavDropdown.Item href="/manage-reservations">
                                            Manage Reservations
                                        </NavDropdown.Item> : <></>}


                                    <NavDropdown.Item href="#dark-mode">Dark Mode</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => logout()}>
                                        Signout
                                    </NavDropdown.Item>
                                </NavDropdown> :
                                <Container className='authentication-buttons'>
                                    {/* < href="/faq">FAQ</Nav.Link> */}
                                    <Button href="/login" className="btn login" >Login</Button>
                                    <Button href="/register" className="btn signup" variant='outline-primary'>Sign Up</Button>
                                </Container>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CommonNavbar;