import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddContact({ addContactHandler }) {
  const [state, setState] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const add = (event) => {
    event.preventDefault();
    if (state.name.trim() === "" || state.email.trim() === "") {
      alert("All the fields are mandatory!");
      return;
    }
    addContactHandler(state);
    setState({ name: "", email: "" });
    navigate("/");  // Navigate back to the contact list after adding a contact 
  };

  return (
    <div className='ui name'>
      <h2>Add Contact</h2>
      <form className='ui form' onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input type='text' name='name' placeholder='Enter Name' value={state.name} onChange={(event) => setState({ ...state, name: event.target.value })} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type='email' name='email' placeholder='Enter Email' value={state.email} onChange={(event) => setState({ ...state, email: event.target.value })} />
        </div>
        <button className='ui button blue'>Add</button>
      </form>
    </div>
  );
}

export default AddContact;