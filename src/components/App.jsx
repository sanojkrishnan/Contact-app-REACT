import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; //importing uuid to generate unique ids for contacts
import Header from "./Header"; //Header component import
import AddContact from "./AddContact"; //AddContact component import
import ContactList from "./ContactList"; //ContactList component import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react-router-dom is a package that is used to create routing pages in react.
//aliasing BrowserRouter as Router for easier use.
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import contactExp from "../api/contacts";
import EditContact from "./EditContact";

//-------------------------All Imports are done here-------------------------//

function App() {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(false); //to prevent overwriting of contacts when component re-renders.
  const [searchTerm, setSearchTerm] = useState(""); //to search contacts
  const [searchResults, setSearchResults] = useState([]); //to show the search results

  const LOCAL_STORAGE_KEY = "contacts"; //key to store the contacts in local storage.

  //---------------------Adding Contacts ---------------------------//

  //retrieve contacts from the server
  const retrieveContacts = async () => {
    const response = await contactExp.get("/contacts"); //making a GET request to the contacts API to get all the contacts.
    return response.data; //returning the data from the response.
  };

  const addContactHandler = async (contact, id) => {
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
        id: uuidv4(), // generates a unique id
        ...contact,
      };
      const response = await contactExp.post("/contacts", request); //making a POST request to the contacts API to add a new contact.
      setContacts((prevContacts) => [{ ...response.data }, ...prevContacts]); //adding new contact to the contacts
      console.log("contacts in App.jsx", contacts);
    }
  };

  //---------------------lifecycle methods for adding contacts---------------------------//

  useEffect(() => {  ///saving it in local storage as cache
    if (loaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)); //here we are using local storage to store the contacts array in the browser.
    }
  }, [contacts, loaded]); //this will run every time the contacts array changes or when the component is loaded.

  useEffect(() => {
    /*useEffect is to control the lifecycle methods of the contacts array.
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); //here we are getting the contacts array from the local storage.
    if (storedContacts) {
      //this will only run if there are contacts in the local storage
      setContacts(storedContacts); //setting the contacts array to the state.

      setLoaded(true); //setting loaded to true so that the contacts are only loaded once when the component is mounted.
    }*/ //(This code is commented because now we are using a json server to store the contacts instead of local storage.)
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

  //----------------------Searching contacts feature-------------------//
  const searchHandler = (searchTerm) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);

    if(searchTerm.trim() !== ""){
      const newContactList = contacts.filter((contact)=> {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase()) //.join will join the array of object completely to a string .toLowerCase will change the values to complete lowercase. .includes check if the search term is included in the string or not
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
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
              path="/Add-contact"
              element={<AddContact addContactHandler={addContactHandler} />}
            />
            {/*Route is giving the path to the separate component that in separate pages */}
            {/*element is used to pass props to the component */}
            <Route
              path="/"
              element={
                <ContactList
                  contacts={searchTerm.length < 1 ? contacts : searchResults }
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              }
            />
            <Route path="/contact/:id" element={<ContactDetail />} />
            {/*:id is a route parameter that will match the id of the contact */}
            <Route
              path="/delete/:id"
              element={<DeleteContact getContactId={removeContactHandler} />}
            />
            <Route
              path="/edit/:id"
              element={<EditContact editContactHandler={addContactHandler} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
