import React from "react";
import user from "../images/contact image.jpg";
import { Link } from "react-router-dom"; //for linking routes and navigation between pages

function ContactCard(props) {
  const { id, name, email } = props.item; //destructuring the props object to get the values.
  return (
    <div className="item" key={id}>
      <img className="ui avatar image" src={user} alt="user image" />
      <div className="content">
        <Link
          to={`/contact/${id}`}
          state={{ contact: props.item }} //state is used for 
        >
          {/*we can pass values using state key in the link */}
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </Link>

        <Link to={`/delete/${id}`} state={{ contact: props.item }}><i
          className="trash alternate outline icon"
          style={{ cursor: "pointer", color: "red", marginTop: "7px", marginLeft: "10px" }}
        ></i>
        </Link>
        <Link to={`/edit-contact/${id}`} state={{ contact: props.item }}><i
          className="edit alternate outline icon"
          style={{ cursor: "pointer", color: "blue", marginTop: "7px" }}
        ></i>
        </Link>
      </div>
    </div>
  );
}

export default ContactCard;
