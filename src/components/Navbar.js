import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;