import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; //use navigate is used to navigate on function instead of components

function DeleteContact(props) {
  const navigate = useNavigate(); //initializing the useNavigate hook
  const location = useLocation();
  const { name, email, id } = location.state.contact;
  const DeleteDetails = () => {
    props.getContactId(id);
    const confirmed = window.confirm("Delete complete. Go back to home page.");
    if (confirmed) {
      navigate("/"); // navigating back to home page after deletion
    }
  };
  return (
    <div>
      <h2>Delete Contact?</h2>
      <p>Are you sure you want to delete this contact?</p>
      <ul>
        <li>{name}</li>
        <li>{email}</li>
      </ul>
      <br />
      <br />
      <button className="ui button red" onClick={DeleteDetails}>
        Delete Anyway
      </button>
    </div>
  );
}

export default DeleteContact;
