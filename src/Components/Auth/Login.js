import React, { Component } from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { UserContext } from '../context/UserContext'
import { FaHome } from 'react-icons/fa'
import { handleLogin } from '../../service/userService'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const navigate = useNavigate();
    // const {loginContext} = useContext(UserContext)
    const passwordRef = useRef()

    const handleSubmitLogin = async () => {

        setLoadingApi(true)
        setTimeout(async () => {
            let res = await handleLogin(email, password)
            console.log(res);
            if (res && res.errCode === 0) {
                toast.success('Login success!')
                navigate('/admin')
            } else if (res.errCode === 3) {
                toast.error(res.massage)
            } else {
                toast(res.massage)
            }
        }, 1500);
        setLoadingApi(false)
    }


    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <>
            <div className='circle-home' onClick={() => handleGoBack()}>
                <span className='home-login'><FaHome /></span>
            </div>

            <div className="login-container">
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                <h1 className="text-center">Hello Guys!</h1>
                <div className="needs-validation">
                    <div className="form-group">
                        <label className="form-label" >Email address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            type="email"
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    passwordRef.current.focus();
                                }
                            }}
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            ref={passwordRef}
                            className="form-control"
                            type={isShowPassword === true ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    handleSubmitLogin();
                                }
                            }}
                        />
                    </div>

                    <i
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}

                    ></i>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" id="check" />
                        <label className="form-check-label">Remember me</label>
                    </div>
                    <button
                        onClick={() => handleSubmitLogin()}
                        className={email && password ? 'btn-login active' : 'btn-login'}
                        disabled={email && password ? false : true}
                    >
                        {loadingApi === true && <i className="fa-solid fa-circle-notch fa-spin"></i>}LOGIN

                    </button>
                </div>

            </div>
        </>
    )
}

export default Login;