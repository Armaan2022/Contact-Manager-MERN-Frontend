import {  useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const MyContact = () => {
    const [showModal, setShowModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [contactDetails, setContactDetails] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [originalContacts, setOriginalContacts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async() => {
            try {
                const res = await fetch(`http://localhost:5000/api/mycontacts`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const result = await res.json();
                if(!result.error){
                    setContacts(result.contacts);
                    setOriginalContacts(result.contacts);
                    setIsLoading(false);
                } else{
                    console.log(result.error);
                    setIsLoading(false);
                }
            } catch (err){
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const deleteContact = async(id) => {
        if(window.confirm("Are you sure you want to delete the contact?")){
            try{ 
                const res = await fetch(`http://localhost:5000/api/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    const result = await res.json();
                    if(!result.error){
                        setShowModal(false);
                        setContacts(result.contacts);
                        setOriginalContacts(result.contacts);
                    }
                    else{
                        console.log(result.error);
                    }
            } catch(err) {
                console.log(err)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newContacts = originalContacts.filter(contact => contact.name.toLowerCase().includes(searchInput.toLowerCase()));
        setContacts(newContacts);
    }

    return (
        <>
            <div className="text-center ">
                <h1 style={{fontSize: "40px"}}>My Contacts</h1>
            <hr className="my-4"/>

            <form class="d-flex" onSubmit={handleSubmit}>
                <input 
                    class="form-control me-sm-2 rounded" 
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.currentTarget.value)} 
                    placeholder="Search for contacts"/>
                <button 
                    class="btn btn-info rounded-pill my-sm-0" 
                    type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>

            {isLoading ? <Spinner /> : (
            <>
            {contacts.length === 0 ? (<>
            <h5 className="my-3">No contacts created yet</h5>
            <button className="btn btn-info btn-sm" onClick={() => {
                navigate("/create", { replace: true })
            }}>Create contacts</button>
            </>
            ) : (
            <table className="table table-hover my-5">
                <thead>
                    <tr className="table-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr className="table-secondary" key={contact._id} onClick={() => {
                            //setContactDetails({});
                            setContactDetails(contact);
                            setShowModal(true);
                            }}>
                        <th scope="row">{contact.name}</th>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.address}</td>
                        <td>{contact.notes}</td>
                        </tr> 
                    ))}
                </tbody>
            </table>)}
            </>
            )}
            </div> 

            <Modal show={showModal} onHide={() => {setShowModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{contactDetails.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{contactDetails.email ? <><b>Email: </b>{contactDetails.email}</> : ''}</p>
                    <p>{contactDetails.phone ? <><b>Phone: </b>{contactDetails.phone}</> : ''}</p>
                    <p>{contactDetails.address ? <><b>Address: </b>{contactDetails.address}</> : ''}</p>
                    <p>{contactDetails.notes ? <><b>Notes: </b>{contactDetails.notes}</> : ''}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Link className="btn btn-warning rounded" to={`/edit/${contactDetails._id}`}>Edit</Link>
                    <button className="btn btn-danger rounded" onClick={() => deleteContact(contactDetails._id)}>Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyContact;