import React from 'react'

function SearchContact() {
      const searchHandler = (searchTerm) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);

    if (searchTerm.trim() !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()); //.join will join the array of object completely to a string .toLowerCase will change the values to complete lowercase. .includes check if the search term is included in the string or not
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <div>SearchContact</div>
  )
}

export default SearchContact