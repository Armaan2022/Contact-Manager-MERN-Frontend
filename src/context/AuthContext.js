import { createContext, useContext, useEffect, useState} from "react";
import ToastContext from "./ToastContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        isLoggedIn();
    }, [])

    const isLoggedIn = async() => {
        try {
            const res = await fetch(`http://localhost:5000/api/me`, {
                method: 'GET',
                headers: {
                    Authorization: `bearer: ${localStorage.getItem("token")}`
                }
            });
            const result = await res.json();
            if (!result.error){
                setUser(result);
                navigate("/", { replace: true });

            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    //login
    const loginUser = async(userData) => {
        try {
            const res = await fetch(`http://localhost:5000/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...userData })
            });
            const result = await res.json();
            if (!result.error){
                localStorage.setItem("token", result.token);
                setUser(result.user);
                toast.success(`Welcome ${result.user.name}!`);
                
                navigate("/", { replace: true });
            } else {
                toast.error(result.error);
            }
        } catch (err) {
            console.log(err);
        }
    }

    //register
    const registerUser = async(userData) => {
        try {
            const res = await fetch(`http://localhost:5000/api/register`, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...userData })
            });
            const result = await res.json();
            if (!result.error){
                toast.success("Registered successfully! Login to continue.")
                navigate('/login', { replace: true });
            } else{
                toast.error(result.error);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>{children}</AuthContext.Provider>
};

export default AuthContext;