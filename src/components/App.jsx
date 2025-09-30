import React, { useEffect, useState } from "react";
import Header from "./Header"; //Header component import
import ContactList from "./ContactList"; //ContactList component import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react-router-dom is a package that is used to create routing pages in react.
//aliasing BrowserRouter as Router for easier use.
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import contactExp from "../api/contacts";
import AddEditContact from "../HOC/AddEditContact";
import SearchContact from "./SearchContact";

//-------------------------All Imports are done here-------------------------//

function App() {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false); //to prevent overwriting of contacts when component re-renders.
  const [searchResults, setSearchResults] = useState([]); //to show the search results

  const LOCAL_STORAGE_KEY = "contacts"; //key to store the contacts in local storage.

  //---------------------Adding Contacts ---------------------------//

  //retrieve contacts from the server
  const retrieveContacts = async () => {
    const response = await contactExp.get("/contacts"); //making a GET request to the contacts API to get all the contacts.
    return response.data; //returning the data from the response.
  };

  //---------------------lifecycle methods for adding contacts---------------------------//

  useEffect(() => {
    ///saving it in local storage as cache
    if (loaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); //here we are using local storage to store the contacts array in the browser.
    }
  }, [contacts, loaded]); //this will run every time the contacts array changes or when the component is loaded.

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts(); //retrieving all the contacts from the json server.
      if (allContacts) {
        setContacts(allContacts); //setting the contacts array to the state.
      }
      setLoaded(true);
    };
    getAllContacts(); //calling the function to get all the contacts from the json server.
  }, []); //empty dependency array means this will only run once when the component is mounted.

  //---------------------Removing contacts---------------------------//

  const removeContactHandler = async (id) => {
    await contactExp.delete(`/contacts/${id}`); //making a DELETE request to the contacts API to delete a contact.
    const updatedContacts = await retrieveContacts(); // fetch latest contacts
    setContacts(updatedContacts);
    console.log("contact removed", id);
  };

  return (
    <>
      <div className="ui container">
        <Router>
          {/*adding all the components inside the router component will create a route */}
          <Header />
          <Routes>
            {/*Routes is used to group the routes and only one route will be rendered at a time */}
            <Route
              path="/add-contact"
              element={<AddEditContact updateContacts={setContacts} />}
            />
            {/*Route is giving the path to the separate component that in separate pages */}
            {/*element is used to pass props to the component */}
            <Route
              path="/edit-contact/:id"
              element={<AddEditContact updateContacts={setContacts} />}
            />

            <Route
              path="/"
              element={
                <>
                  <SearchContact
                    contacts={contacts}
                    updateResults={setSearchResults}
                  />
                  <ContactList
                    contacts={
                      searchResults.length < 1 ? contacts : searchResults
                    }
                  />
                </>
              }
            />

            <Route path="/contact/:id" element={<ContactDetail />} />
            {/*:id is a route parameter that will match the id of the contact */}
            <Route
              path="/delete/:id"
              element={<DeleteContact getContactId={removeContactHandler} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
