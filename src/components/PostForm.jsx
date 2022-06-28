import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import * as Yup from "yup";

const PostForm = () => {
  const [canyonName, setCanyonName] = useState([]);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/v1/canyons")
      .then((res) => setCanyonName(res.data))
      .catch((err) => console.log("Error on get canyon in nav", err));
  }, []);

  const canyonsMapped = canyonName.map((el, index) => {
    return (
      <option key={index} value={el.name}>
        {el.name}
      </option>
    );
  });

  const validationSchema = Yup.object({
    username: Yup.string().required("You must provide a username"),
    text: Yup.string().required("You must provide a description"),
    canyon_select: Yup.string()
      .required("Please select a canyon")
      .nullable("Please select a canyon"),
  });

  const postHandler = () => {
    MySwal.fire({
      title: "<h2>Post Submitted</h2>",
      text: "Thanks for Contributing",
      confirmButtonColor: "Head to Home Page",
      allowOutsideClick: false,
    }).then(() => navigate("/"));
  };

  return (
    <div className="mt-20 mx-auto text-text">
      <Formik
        initialValues={{
          username: "",
          text: "",
          img_url: "",
          canyon_select: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          axios
            .post("http://localhost:4005/api/v1/post", values)
            .then((res) => console.log(res))
            .catch((err) => console.log("FE error on create post", err));
        }}
      >
        <Form className="flex flex-col space-y-2 mx-auto border border-text rounded-3xl p-7 w-96 shadow-2xl">
          <h1 className="m-auto border-b text-lg">Thanks for Sharing!</h1>
          <label>Username</label>
          <Field name="username" className="border border-text w-full" />
          <ErrorMessage name="username" />
          <label>Image URL</label>
          <Field name="img_url" className="border border-text" />
          <label>Canyon Selector</label>
          <Field
            as="select"
            name="canyon_select"
            className="border border-text"
          >
            <option value="Select a Canyon" defaultValue selected disabled>
              Canyons
            </option>
            {canyonsMapped}
          </Field>
          <ErrorMessage name="canyon_select" />
          <label>Caption</label>
          <Field
            className="border border-text"
            as="textarea"
            name="text"
            placeholder="Enter Experience"
            rows="3"
          />
          <ErrorMessage name="text" />
          <button
            type="submit"
            onClick={postHandler}
            className="border border-text"
          >
            Publish Post
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PostForm;
