import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Navbar = () => {

    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const { user, setUser } = useContext(AuthContext);

    const logout = () => {
        setUser(null);
        localStorage.clear();
        toast.success("Logged out");
        navigate("/login", { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <a className="navbar-brand">Contact Manager</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ms-auto">
                        {user ? 
                            <>
                                <li className="nav-item">
                                    <button type='button' className='btn btn-danger' onClick={logout}>Logout</button>
                                </li>
                            </> : 
                            <>
                                <li className="nav-item">
                                    <Link to="/login" style={{textDecoration: 'none'}}>
                                        <a className="nav-link">Login</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" style={{textDecoration: 'none'}}>
                                        <a className="nav-link">Register</a>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;