import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './Form.css'

const SignupForm = ({ values, errors, touched, status }) => {
 
  const [user, setUser] = useState([]);
  useEffect(() => {
    status && setUser(user => [...user, status]);
  }, [status]);
  return (
    <div className="signup-form">
      <h1>Sign Up!</h1>
      <Form>
        <br />
        <label htmlFor="username">
          Username
          <Field
            id="username"
            type="text"
            name="username"
            placeholder="Username"
          />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>
        <br />
        <label htmlFor="password">
          Password
          <Field id="password" type="text" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <br />
        <label htmlFor="email">
          Email
          <Field id="email" type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <br />
        <label className="checkbox-container">
         I have read and agree to the Terms of Service
          <Field
            type="checkbox"
            name="termsread"
            checked={values.termsread}
          />
          <span className="checkmark" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      {user.map(user => {
        return (
          <ul key={user.id}>
            <li>Username: {user.username}</li>
            <li>Password: {user.password}</li>
            <li>Email: {user.email}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikSignupForm = withFormik({
 
  mapPropsToValues(props) {

    return {
        username: props.username || "",
        password: props.password || "",
        email: props.email || "",
        termsread: props.termsread || false,
      };
    },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username Required"),
    password: Yup.string().required("Password Required"),
    email: Yup.string().required("Email Required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(SignupForm);
export default FormikSignupForm;
