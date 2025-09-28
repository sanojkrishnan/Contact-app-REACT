import React from "react";
import { useParams } from "react-router-dom";
import AddContact from "../components/AddContact";
import EditContact from "../components/EditContact";
import { v4 as UUID } from "uuid";
import contactExp from "../api/contacts";

const AddEditContact = ({ updateContacts }) => {
  const { id } = useParams(); // get :id from route

  const addEditContactHandler = async (contact) => {
    if (id) {
      const response = await contactExp.put(`/contacts/${id}`, contact);
      updateContacts(prev => prev.map(item => (item.id === id ? response.data : item)));
    } else {
      const request = { id: UUID(), ...contact };
      const response = await contactExp.post("/contacts", request);
      updateContacts(prev => [response.data, ...prev]);
    }
  };

  // Render Add or Edit form based on route param
  return id ? (
    <EditContact AddOrEdit={addEditContactHandler} />
  ) : (
    <AddContact AddOrEdit={addEditContactHandler} />
  );
};

export default AddEditContact;
