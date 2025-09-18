import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom"; //for linking pages with buttons or anchor tags

function ContactList(props) {
  //props is used to get the data from parent component, here we are getting "contacts" array from App.jsx(parent component).
  console.log(props);

  const { contacts } = props;

  const renderContactList = contacts.map((contacts) => {
    console.log("item to contact card", contacts);
    return (
      <>
        <ContactCard item={contacts} key={contacts.id} />
      </>
    );
  });
  return (
    <>
      <div className="ui name">
        <h2>
          Contact List
          <Link to={"/Add-contact"}>
            {" "}
            {/**giving the route path here "Add-contact" is the route path*/}
            <button className="ui button blue right">Add contact</button>
          </Link>
        </h2>
        <br />
        <br />
      </div>
      <div className="ui celled list">{renderContactList}</div>
    </>
  );
}

export default ContactList;
