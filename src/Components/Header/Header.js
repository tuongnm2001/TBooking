import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
import logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux';

const Header = () => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

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
                            <NavLink to='/admin' className='nav-link'>ADMIN</NavLink>
                        </Nav>

                        <Nav>
                            <h2>{account.email}</h2>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {
                                    isAuthenticated === false ?
                                        <>
                                            <NavLink className='dropdown-item' to='/login'>Login</NavLink>

                                        </>
                                        :
                                        <NavDropdown.Item>Logout</NavDropdown.Item>

                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;