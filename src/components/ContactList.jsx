import React from "react";
import ContactCard from "./ContactCard";

function ContactList(props) {
  //props is used to get the data from parent component, here we are getting "contacts" array from App.jsx(parent component).
  console.log(props);

  const { contacts, getContactId } = props;

  const deletionHandler = (id) => {
    getContactId(id);
  };

  const renderContactList = contacts.map((contacts) => {
    console.log("item to contact card", contacts);
    return (
      <>
        <ContactCard
          item={contacts}
          clickHandler={deletionHandler}
          key={contacts.id}
        />
      </>
    );
  });
  return (
    <>
      <div className="ui name">
        <br/>
        <br/>
        <h2>Contact List</h2>
        <br/>
        <br/>
      </div>
      <div className="ui celled list">{renderContactList}</div>
    </>
  );
}

export default ContactList;
