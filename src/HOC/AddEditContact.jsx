import React, { useState } from 'react';
import {v4 as UUID} from 'uuidv4'
import contactExp from '../api/contacts';
import AddContact from "../components/AddContact"

const AddEditContact = () => {
    const [contacts , setContacts]= useState([])
    
    const addEditContactHandler = async (contact, id) => {
    console.log("the values of  id ", id);

    //editing section
    if (id) {
      const response = await contactExp.put(`/contacts/${id}`, contact); //making a PUT request to the contacts API to update the contact.
      setContacts((prevContacts) =>
        prevContacts.map((item) => (item.id === id ? response.data : item))
      );
    }

    //adding section
    else {
      console.log("the values of location ", location);
      console.log(`New Contact Added ${contacts.name}`);

      const request = {
        id: UUID(), // generates a unique id
        ...contact,
      };
      const response = await contactExp.post("/contacts", request); //making a POST request to the contacts API to add a new contact.
      setContacts((prevContacts) => [{ ...response.data }, ...prevContacts]); //adding new contact to the contacts
      console.log("contacts in App.jsx", contacts);
    }
  };

  return (
    <>
        <AddContact AddOrEdit={addEditContactHandler}/>
    </>
  )
}

export default AddEditContact