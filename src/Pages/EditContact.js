import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

const EditContact = () => {
    const [ userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
    });
    const { id } = useParams();
    const { user, editContact } = useContext(AuthContext);
    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        editContact(id, userDetails);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async() => {
            try {
                const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const result = await res.json();
                setUserDetails({ name: result.name, email: result.email, phone: result.phone, address: result.address, notes: result.notes });
                setIsLoading(false);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? <Spinner /> : ( <>
            <h2>Edit your contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputName" className="form-label mt-4" style={{color:"black", fontWeight:"200"}}>
                        <span style={{color:"red"}}>*</span> Name
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        name="name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({...userDetails, name: e.currentTarget.value})}
                        id="inputName"
                        placeholder="Contact name"
                        style={{backgroundColor:"#d9d9d9"}}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail" className="form-label mt-4" style={{color:"black", fontWeight:"200"}}>
                        Email
                    </label>
                    <input 
                        type="email"
                        className="form-control"
                        name="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({...userDetails, email: e.currentTarget.value})}
                        id="inputEmail"
                        placeholder="Add email"
                        style={{backgroundColor:"#d9d9d9"}}
                        autoComplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPhone" className="form-label mt-4" style={{color:"black", fontWeight:"200"}}>
                        <span style={{color:"red"}}>*</span> Phone No.
                    </label>
                    <input 
                        type="number"
                        className="form-control"
                        name="phone"
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({...userDetails, phone: e.currentTarget.value})}
                        id="inputPhone"
                        placeholder="Add Phone number"
                        style={{backgroundColor:"#d9d9d9"}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress" className="form-label mt-4" style={{color:"black", fontWeight:"200"}}>
                        Address
                    </label>
                    <input 
                        type="text"
                        className="form-control"
                        name="address"
                        value={userDetails.address}
                        onChange={(e) => setUserDetails({...userDetails, address: e.currentTarget.value})}
                        id="inputAddress"
                        placeholder="Add address"
                        style={{backgroundColor:"#d9d9d9"}}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputNotes" className="form-label mt-4" style={{color:"black", fontWeight:"200"}}>
                        Notes
                    </label>
                    <textarea 
                        type="text"
                        className="form-control"
                        name="notes"
                        value={userDetails.notes}
                        onChange={(e) => setUserDetails({...userDetails, notes: e.currentTarget.value})}
                        id="inputNotes"
                        placeholder="Enter notes"
                        rows="4"
                        style={{backgroundColor:"#d9d9d9"}}
                    />
                </div>  
                <button type="submit" className="btn btn-info my-4">Save Changes</button>
            </form>
            </> )}
        </>
    );
};

export default EditContact;