import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';

const Register = () => {

    const { registerUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (credentials.password !== credentials.confirmPassword){
            toast.error("Password doesn't match!", {autoClose: 2000});
            setCredentials({...credentials, password: "", confirmPassword: ""});
        } else{
            const userData = {...credentials, confirmPassword: undefined};
            registerUser(userData);
            toast.success("Registered", {autoClose: 2000});
            setCredentials({name: "", email: "", password: "", confirmPassword: ""});
        }
        
    };

    return (
        <>
            <ToastContainer />
            <h3>Create an account</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputName" className="form-label mt-4">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name='name'
                        value={credentials.name}
                        onChange={(e) => setCredentials({...credentials, name: e.currentTarget.value})}
                        id="inputName"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="form-label mt-4">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.currentTarget.value})}
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="form-label mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.currentTarget.value})}
                        id="inputPassword"
                        placeholder="Password"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label mt-4">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name='confirmPassword'
                        value={credentials.confirmPassword}
                        onChange={(e) => setCredentials({...credentials, confirmPassword: e.currentTarget.value})}
                        id="confirmPassword"
                        placeholder="Re-enter password"
                        autoComplete="off"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary my-4">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </>
    );
};

export default Register;