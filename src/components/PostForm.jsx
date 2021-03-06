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

  const username = sessionStorage.getItem("username");

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
    // username: Yup.string().required("Please provide a username"),
    text: Yup.string().required("Please provide a description"),
    canyon_select: Yup.string()
      .required("Please select a canyon")
      .nullable("Please select a canyon"),
  });

  const postHandler = () => {
    MySwal.fire({
      customClass: {
        confirmButton: "bg-aero p-3",
      },
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
          // username: "",
          text: "",
          img_url: "",
          canyon_select: null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          const id = sessionStorage.getItem("user");
          console.log(id);
          const { text, img_url, canyon_select } = values;
          const bodyObject = {
            text: text,
            img_url: img_url,
            canyon_select: canyon_select,
            id: id,
          };
          axios
            .post("http://localhost:4005/api/v1/post", bodyObject)
            .then(() => postHandler())
            .catch((err) => console.log("FE error on create post", err));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-2 mx-auto border border-text rounded-3xl p-7 w-96 shadow-2xl bg-pinkOfNY">
            <h1 className="m-auto border-b text-lg">Thanks for Sharing!</h1>
            <h3>{`${username}`}</h3>
            {/* <label>Username</label>
            <Field name="username" className="border border-text w-full" />
            <ErrorMessage
              name="username"
              className="border-2 border-error"
              component="div"
            /> */}
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
            <ErrorMessage
              name="canyon_select"
              className="border-2 border-error"
              component="div"
            />
            <label>Caption</label>
            <Field
              className="border border-text"
              as="textarea"
              name="text"
              placeholder="Enter Experience"
              rows="3"
            />
            <ErrorMessage
              name="text"
              className="border-2 border-error"
              component="div"
            />
            <button type="submit" className="border border-text bg-aero">
              Publish Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostForm;
