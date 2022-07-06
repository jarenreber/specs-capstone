import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

const LoginForm = ({ setLoginStatus }) => {
  const loginSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  return (
    <div className="mt-20 mx-auto text-text">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          const { username, password } = values;
          axios
            .post("http://localhost:4005/api/v1/login", {
              username: username,
              password: password,
            })
            .then(async (res) => {
              console.log(res.data.id);
              await sessionStorage.setItem("user", res.data.id);
              await sessionStorage.setItem("username", res.data.username);
              await sessionStorage.setItem("isAdmin", res.data.isAdmin);
            })
            .then(() => {
              setLoginStatus();
              this.forceUpdate();
            })
            .catch((err) => MySwal.fire("Whoops", err.response.data));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-2 mx-auto border border-text rounded-3xl p-7 w-96 shadow-2xl bg-pinkOfNY">
            <h1 className="m-auto border-b text-lg">Hello There!</h1>
            <h3>Sign In Here</h3>
            <label>Username:</label>
            <Field name="username" className="border border-text" />
            <ErrorMessage
              name="username"
              className="border-2 border-error"
              component="div"
            />
            <label>Password:</label>
            <Field
              name="password"
              className="border border-text"
              type="password"
            />
            <ErrorMessage
              name="password"
              className="border border-error"
              component="div"
            />
            <button
              className="border border-text bg-aero"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
