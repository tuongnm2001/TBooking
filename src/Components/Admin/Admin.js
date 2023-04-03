import SideBar from "./SideBar";
import './Admin.scss'
import { useState } from "react";
import { FaBars } from 'react-icons/fa'
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Toggle from 'react-toggle'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Navbar } from "react-bootstrap";

const Admin = (props) => {

    const [collapsed, setCollapsed] = useState(false)
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
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>

            <div className="admin-content">

                <div className="admin-header">
                    <Toggle
                        className="toggle"
                        icons={false}
                        onChange={() => setCollapsed(!collapsed)} />



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
                        <NavDropdown title="Cài đặt" id="basic-nav-dropdown" className="setting">
                            {
                                isAuthenticated === false ?
                                    <NavDropdown.Item className='dropdown-item' onClick={() => handleLogin()}>Login</NavDropdown.Item>
                                    :
                                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>

                            }
                        </NavDropdown>
                    </Nav>
                </div>

                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;