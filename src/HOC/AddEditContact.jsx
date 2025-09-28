import React from 'react';
import {v4 as UUID} from 'uuid'
import contactExp from '../api/contacts';
import AddContact from "../components/AddContact"
import EditContact from '../components/EditContact';

const AddEditContact = ({ updateContacts }) => {
    
    const addEditContactHandler = async (contact, id) => {
    console.log("the values of  id ", id);

    //editing section
    if (id) {
      const response = await contactExp.put(`/contacts/${id}`, contact); //making a PUT request to the contacts API to update the contact.
      updateContacts((prevContacts) =>
        prevContacts.map((item) => (item.id === id ? response.data : item))
      );
    }

    //adding section
    else {
      console.log("the values of location ", location);
      console.log(`New Contact Added`);

      const request = {
        id: UUID(), // generates a unique id
        ...contact,
      };
      const response = await contactExp.post("/contacts", request); //making a POST request to the contacts API to add a new contact.
      updateContacts((prev) => [response.data, ...prev]);  // ✅ update global state
  };
};

  return (
    <>
        <AddContact AddOrEdit={addEditContactHandler}/>
        <EditContact AddOrEdit={addEditContactHandler}/>
    </>
  )
}

export default AddEditContact