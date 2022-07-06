import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

const SignUp = ({ setLoginStatus }) => {
  const signUpSchema = Yup.object({
    username: Yup.string()
      .required("Please enter your username")
      .min(5, "Must be at least 5 characters")
      .max(20, "Must be less than 20 characters"),
    password: Yup.string()
      .required("Please enter your password")
      .min(5, "Must be at least 5 characters")
      .max(20, "Must be less than 20 characters"),
    passwordTwo: Yup.string()
      .required("Please enter your password")
      .min(5, "Must be at least 5 characters")
      .max(20, "Must be less than 20 characters"),
  });

  return (
    <div className="mt-20 mx-auto text-text">
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordTwo: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values) => {
          const { password, passwordTwo, username } = values;
          const body = {
            username: username,
            password: password,
          };
          if (password === passwordTwo) {
            axios
              .post("http://localhost:4005/api/v1/users", body)
              .then((res) => {
                sessionStorage.setItem("user", res.data[0][0].id);
                sessionStorage.setItem("username", res.data[0][0].username);
                setLoginStatus();
              })
              .catch((err) => MySwal("Whoops...", err.response.data));
          } else {
            MySwal.fire({
              title: "Passwords do not match",
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-2 mx-auto border border-text rounded-3xl p-7 w-96 shadow-2xl bg-pinkOfNY">
            <h1 className="m-auto border-b text-lg">Don't Have an Account?</h1>
            <h3>Sign Up Here</h3>

            <label>Enter a Username</label>
            <Field name="username" className="border border-text" />
            <ErrorMessage
              name="username"
              className="border border-error"
              component="div"
            />

            <label>Enter a Password</label>
            <Field
              type="password"
              name="password"
              className="border border-text"
            />
            <ErrorMessage
              name="password"
              className="border border-error"
              component="div"
            />

            <label>Re-enter Password</label>
            <Field
              type="password"
              name="passwordTwo"
              className="border border-text"
            />
            <ErrorMessage
              name="passwordTwo"
              className="border border-error"
              component="div"
            />

            <button
              className="border border-text bg-aero"
              disabled={isSubmitting}
              type="submit"
            >
              Create Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
