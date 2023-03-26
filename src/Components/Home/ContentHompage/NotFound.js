import { NavLink, useNavigate } from 'react-router-dom'


const NotFound = () => {

    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <div style={{ marginTop: '120px' }}>
            <div className="d-flex align-items-center justify-content-center vh-90">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you're looking for doesn't exist.
                    </p>
                    <a className="btn btn-primary" onClick={() => handleGoHome()}>Go Home</a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;