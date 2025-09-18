import React from "react";
import user from "../images/contact image.jpg";
import { Link , useLocation } from "react-router-dom"; //for linking routes and navigation between pages

function ContactDetail() {
  const location = useLocation();
  console.log(location);
  const {name , email} = location.state.contact; //destructuring the location to get the values.
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user"/>
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to={"/"}><button className="ui button blue center">Go Back</button></Link>
      </div>
    </div>
  );
}

export default ContactDetail;
