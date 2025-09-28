import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignupValidation } from "../schema/signupValidation";

function EditContact({ AddOrEdit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state; // object passed from Link
  const { name, email, id } = contact;

  const initialValues = { name, email }; // Formik needs this

  return (
    <div className="ui name">
      <h2>Edit Contact</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupValidation}
        onSubmit={(values) => {
          AddOrEdit(values, id); // pass id for updating
          navigate("/");
        }}
      >
        {({ errors }) => (
          <Form className="ui form">
            <div className="field">
              <label>Name</label>
              <Field type="text" name="name" placeholder="Enter Name" />
              {errors.name && <small>{errors.name}</small>}
            </div>
            <div className="field">
              <label>Email</label>
              <Field type="email" name="email" placeholder="Enter Email" />
              {errors.email && <small>{errors.email}</small>}
            </div>
            <button className="ui button blue">Update</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditContact;
