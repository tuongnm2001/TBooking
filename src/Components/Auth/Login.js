import React, { Component } from 'react'
import { useRef, useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
        let res = await handleLogin(email.trim(), password)
        if (res && res.errCode === 0) {
            toast.success('Login success!')
            navigate('/')
        } else if (res.errCode === 3) {
            toast.error(res.massage)
        } else {
            toast(res.massage)
        }
        setLoadingApi(false)
    }


    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <>
            <div title='Go back Home' className='circle-home' onClick={() => handleGoBack()}>
                <span className='home-login'><FaHome /></span>
            </div>

            <div className="login-container">
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
                        disabled={email && password && loadingApi === false ? false : true}
                    >
                        LOGIN
                    </button>
                    {
                        loadingApi &&
                        <i disabled={loadingApi === false} className="fa-solid fa-circle-notch fa-spin spiner"></i>
                    }

                </div>

            </div>
        </>
    )
}

export default Login;