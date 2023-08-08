import { createContext, useState} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
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
                localStorage.setItem('token', result.token)
            } else {
                console.log(err)
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
            const user = await res.json();
            console.log(user);
        } catch (err) {
            console.log(err);
        }
    }

    return <AuthContext.Provider value={{ loginUser,registerUser }}>{children}</AuthContext.Provider>
};

export default AuthContext;