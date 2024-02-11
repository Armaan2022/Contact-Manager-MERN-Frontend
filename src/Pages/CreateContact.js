import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
    const [ userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
    });
    const { user, createContact } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        createContact(userDetails);
        setUserDetails({name: "", email: "", phone: "", address: "", notes: "",})
    }

    return (
        <>
            <h2>Create your contact</h2>
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
                <button type="submit" className="btn btn-primary my-4">Add contact</button>
            </form>
        </>
    );
};

export default CreateContact;