import React, { useState, useEffect } from "react";

function SearchContact({ contacts, updateResults }) {
  const [term, setTerm] = useState("");

  // whenever term changes, filter the contacts and send back to App.jsx
  useEffect(() => {
    if (term.trim() !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(term.toLowerCase());
      });
      updateResults(newContactList);
    } else {
      updateResults(contacts); // show all contacts when input is empty
    }
  }, [term, contacts, updateResults]);

  const handleChange = (e) => {
    setTerm(e.target.value); // update local state
  };

  return (
    <div className="ui search">
      <div className="ui icon input" style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search Contacts"
          className="prompt"
          value={term}
          onChange={handleChange}
        />
        <i className="search icon"></i>
      </div>
    </div>
  );
}

export default SearchContact;
