import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
    
    const { toast } = useContext(ToastContext);
    const { loginUser } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials);
        setCredentials({email: "", password: ""});
    };

    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="form-label mt-4">
                        Email address
                    </label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
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
                        name="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.currentTarget.value})}
                        id="inputPassword"
                        placeholder="Password"
                        autoComplete="off"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary my-4">Submit</button>
                <p>Don't have an account? <Link to="/register">Register now</Link>
                </p>
            </form>
        </>
    );
};

export default Login;