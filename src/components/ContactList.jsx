import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom"; //for linking pages with buttons or anchor tags

function ContactList(props) {
  //props is used to get the data from parent component, here we are getting "contacts" array from App.jsx(parent component).

  const inputElement = useRef(null);
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

  const GetSearchTerm = () => {
    //doing with useRef();
    console.log(inputElement.current.value);

    props.searchKeyword(inputElement.current.value);
  }
  return (
    <>
      <div className="ui name">
        <h2>
          Contact List
          <Link to={"/add-contact"}>
            {/**giving the route path here "Add-contact" is the route path*/}
            <button className="ui button blue right">Add contact</button>
          </Link>
        </h2>
        <div className="ui search">
          <div className="ui icon input">
            <input type="text" placeholder="Search Here" className="prompt" value={props.term} onChange={GetSearchTerm} ref={inputElement} />
            <i className="search icon"></i>
          </div>
        </div>
        <br />
        <br />
      </div>
      <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No Contacts Available"}</div>
    </>
  );
}

export default ContactList;
