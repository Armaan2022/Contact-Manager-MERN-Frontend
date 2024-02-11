import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        !user && navigate("/login", { replace: true })
    }, []);

    return (
        <>
            <div className="text-center ">
                <h1 style={{fontSize: "40px"}}>Hi, {user ? user.name : null}!</h1>
            </div>
            <hr className="my-5"/>
            <p className="lead my-5" style={{fontSize:"27px", color:"Grey"}}>Welcome to <b style={{color:"black"}}>The Contact Manager</b>. Experience your ultimate solution for efficient and organized contact management.</p>
            <button type="button" className="btn btn-info rounded" onClick={() => {
                navigate("/mycontacts", { replace: true })
            }}>My contacts</button>
            
        </>
    );
};

export default Home;