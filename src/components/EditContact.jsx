import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignupValidation } from "../schema/signupValidation";

function EditContact({ AddOrEdit }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (!location.state?.contact) {
    navigate("/");
    return null; // Prevent crash on refresh
  }

  const { name, email } = location.state.contact;
  const initialValues = { name, email };

  return (
    <div className="ui name">
      <h2>Edit Contact</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={SignupValidation}
        onSubmit={(values) => {
          AddOrEdit(values); // let handler use id internally
          navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form className="ui form">
            <div className="field">
              <label>Name</label>
              <Field type="text" name="name" placeholder="Enter Name" />
              {errors.name && touched.name && <small>{errors.name}</small>}
            </div>
            <div className="field">
              <label>Email</label>
              <Field type="email" name="email" placeholder="Enter Email" />
              {errors.email && touched.email && <small>{errors.email}</small>}
            </div>
            <button className="ui button blue">Update</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditContact;
