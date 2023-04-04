import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'
import logo from '../../assets/img/logo.png'
import { useSelector } from 'react-redux';


const Header = () => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        window.localStorage.clear();
        navigate('/login')
    }

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
                            <NavLink to='/blog' className='nav-link'>BLOG</NavLink>
                            {
                                account && account.roleId === 'R1' || account.roleId === 'R2' ?
                                    <NavLink to='/admin' className='nav-link'>ADMIN</NavLink> : ''
                            }
                        </Nav>

                        <Nav >
                            {
                                isAuthenticated === true ?
                                    <div className='email'>
                                        {/* <img src={account.image} /> */}
                                        <span>{account.email}</span>
                                    </div>
                                    :
                                    ''
                            }
                            <NavDropdown title="Cài đặt" id="basic-nav-dropdown">
                                {
                                    isAuthenticated === false ?
                                        <NavDropdown.Item className='dropdown-item' onClick={() => handleLogin()}>Login</NavDropdown.Item>
                                        :
                                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>

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