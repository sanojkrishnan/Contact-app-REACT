import React from 'react'
import user from "../images/contact image.jpg"

function ContactCard(props) {
    const {id, name, email} = props.item; //destructuring the props object to get the values.
  return (
    <div className="item" key={id}>
        <img className='ui avatar image' src={user} alt='user image' />
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
          <i className="trash alternate outline icon" style={{cursor:"pointer", color:"red", marginTop:"7px" }} onClick={() => {props.clickHandler(id)}} ></i>
        </div>
    </div>
  )
}

export default ContactCard