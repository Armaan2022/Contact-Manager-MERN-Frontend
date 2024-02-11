import { createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ToastContext from "./ToastContext";

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
                navigate("/login", { replace: true });
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

    //create contact
    const createContact = async(userData) => {
        try {
            const res = await fetch(`http://localhost:5000/api/contact`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `bearer: ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ ...userData })
            });
            const result = await res.json();
            if (!result.error){
                toast.success(`Contact ${userData.name} created successfully!`)
            } else{
                toast.error(result.error);
            }
        } catch(err) {
            console.log(err);
        }
    }

    //edit contact
    const editContact = async(id, userData) => {
        try{
            const res = await fetch(`http://localhost:5000/api/contact`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `bearer: ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ id, ...userData })
            });
            const result = await res.json();
            if (!result.error){
                navigate("/mycontacts", { replace: true });
            } else{
                toast.error(result.error);
            }
        } catch(err){
            console.log(err);
        }
    }

    return <AuthContext.Provider value={{ loginUser, registerUser, createContact, editContact, user, setUser }}>{children}</AuthContext.Provider>
};

export default AuthContext;