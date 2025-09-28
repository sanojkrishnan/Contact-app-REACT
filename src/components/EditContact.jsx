
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignupValidation } from "../schema/signupValidation";

function EditContact({ AddOrEdit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email,} = location.state.contact; //destructuring the contact object passed from the Link component in ContactCard.jsx

   

  return (
    <div className="ui name">
      <h2>Edit Contact</h2>
      <Formik
        validationSchema={SignupValidation}
        onSubmit={(values) => {
          AddOrEdit(values);
          navigate("/");
        }}
      >
        {({ errors }) => (
          <Form className="ui form">
            <div className="field">
              <label>Name</label>
              <Field
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
              />
              {errors.name && <small>{errors.name}</small>}
            </div>
            <div className="field">
              <label>Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
            <button className="ui button blue">Update</button>
          </Form>
        )}
        ;
      </Formik>
    </div>
  );
}

export default EditContact;
