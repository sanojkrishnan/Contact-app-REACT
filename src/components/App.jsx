import React, { useEffect, useState } from "react";
import "./App.css"; //css style import
import Header from "./Header"; //Header component import
import AddContact from "./AddContact"; //AddContact component import
import ContactList from "./ContactList"; //ContactList component import

//-------------------------All Imports are done here-------------------------//

function App() {
  const [ contacts, setContacts ] = useState([]);
  const [loaded, setLoaded] = useState(false);  //to prevent overwriting of contacts when component re-renders.

  const LOCAL_STORAGE_KEY = "contacts"; //key to store the contacts in local storage.

  //---------------------Adding Contacts ---------------------------//

  const addContactHandler = (contact) => {
    console.log(`New Contact Added ${contacts.name}`);
     setContacts(prevContacts => [{ id: Date.now(), ...contact }, ...prevContacts]); //adding new contact to the contacts along with a unique id using Date.now()
    console.log("contacts in App.jsx", contacts);
  };

     //---------------------lifecycle methods for adding contacts---------------------------//

  useEffect(()=>{ 
    if(loaded) {  
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))   //here we are using local storage to store the contacts array in the browser.
    }
  },[contacts, loaded]); //this will run every time the contacts array changes or when the component is loaded.


  useEffect(()=>{     //useEffect is to control the lifecycle methods of the contacts array.
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));  //here we are getting the contacts array from the local storage.
    if(storedContacts){   //this will only run if there are contacts in the local storage
        setContacts(storedContacts); //setting the contacts array to the state.

         setLoaded(true); //setting loaded to true so that the contacts are only loaded once when the component is mounted.
    }
  },[]) //empty dependency array means this will only run once when the component is mounted.


  //---------------------Removing contacts---------------------------//

  const removeContactHandler = (id) => {
    setContacts(contacts.filter((item) =>item.id !==id )); //filtering not the contact which is to be removed.
    console.log("contact removed", id);
  }

  return (
    <>
      <div className="ui container">
        <Header />
        <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/>
      </div>
    </>
  );
}

export default App;
