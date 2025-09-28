import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignupValidation } from "../schema/signupValidation";

const initialValues = {
  name: "",
  email: "",
};

function AddContact({AddOrEdit}) {
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes


  return (
    <div className="ui name">
      <h2>Add Contact</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupValidation}
        onSubmit={(values) => {
          AddOrEdit(values); // send form data
          navigate("/"); // go back only after successful submit
        }}
      >
        {({ errors }) => (
          <Form className="ui form">
            <div className="field">
              <label>Name</label>
              <Field type="text" name="name" placeholder="Enter Name" />
              <br />
              {errors.name && <small>{errors.name}</small>}
            </div>
            <div className="field">
              <label>Email</label>
              <Field type="email" name="email" placeholder="Enter Email" />
              <br />
              {errors.email && <small>{errors.email}</small>}
            </div>
            <button className="ui button blue">
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddContact;
