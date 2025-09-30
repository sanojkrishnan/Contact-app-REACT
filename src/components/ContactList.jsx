import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

function ContactList({ contacts }) {
  const renderContactList = contacts.map((contact) => {
    console.log("item to contact card", contact);
    return <ContactCard item={contact} key={contact.id} />;
  });

  return (
    <>
      <div className="ui name">
        <h2>
          Contact List
          <Link to={"/add-contact"}>
            <button className="ui button blue right">Add contact</button>
          </Link>
        </h2>
      </div>

      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Available"}
      </div>
    </>
  );
}

export default ContactList;
