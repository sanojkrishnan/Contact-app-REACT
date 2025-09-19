import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EditContact({ editContactHandler }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {name, email, id} = location.state.contact //destructuring the contact object passed from the Link component in ContactCard.jsx

  const [state, setState] = useState({name, email});


  const update = (event) => {
    event.preventDefault();
    editContactHandler(state , id);
    navigate("/");  // Navigate back to the contact list after adding a contact 
  };

  return (
    <div className='ui name'>
      <h2>Edit Contact</h2>
      <form className='ui form' onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input type='text' name='name' placeholder='Enter Name' value={state.name} onChange={(event) => setState({ ...state, name: event.target.value })} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type='email' name='email' placeholder='Enter Email' value={state.email} onChange={(event) => setState({ ...state, email: event.target.value })} />
        </div>
        <button className='ui button blue'>Update</button>
      </form>
    </div>
  );
}

export default EditContact;