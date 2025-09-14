import React from 'react';

class AddContact extends React.Component {  //Here we are using Class Component
    state ={
        name: "",
        email: ""
    }
    add = (event) => {
        event.preventDefault(); //to prevent the default behaviour of the form which is to refresh the page on submit.
        if(this.state.name.trim() === "" || this.state.email.trim() === "") {
            alert("All the fields are mandatory!");
            return;
        }
        this.props.addContactHandler(this.state); //calling the function from App.jsx and passing the state as an argument.
        this.setState({name:"", email:""}); //to clear the input fields after submitting the form.
    }
    
    render() { 
               /*Class component must have "extends","React.Component" in them because it works that way */
        return (    //"render()" method is used to display the JSX here compared to function component.
            <div className='ui name'>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Enter Name' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value})}/> 
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Enter Email' value={this.state.email} onChange={(event) => this.setState({ email: event.target.value})}/> 
                    </div>
                    <button className='ui button blue'>Add</button>
                </form>
            </div>
        )
    }
};

export default AddContact;