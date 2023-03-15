import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
import logo from '../../assets/img/logo.png'

const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg" className='header-container fixed-top'>
                <Container>
                    <Link to='/' className='navbar-brand'>
                        <img src={logo} className='img-logo' />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/' className='nav-link'>HOME</NavLink>
                            <NavLink to='/user' className='nav-link'>USER</NavLink>
                            <NavLink to='/doctor' className='nav-link'>DOCTOR</NavLink>
                        </Nav>

                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavLink className='dropdown-item' to='/login'>Login</NavLink>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;