import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const CanyonForm = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const canyonHandler = () => {
    MySwal.fire({
      title: "<h2>Canyon Added</h2>",
      text: "Thanks for Contributing",
      confirmButtonColor: "Head to Home Page",
      allowOutsideClick: false,
    }).then(() => navigate("/"));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please provide a canyon name"),
    image_url: Yup.string().required("Please provide an image"),
    location: Yup.string().required("Please provide a location"),
    description: Yup.string().required("Please provide a description"),
  });

  return (
    <div className="mt-20 mx-auto text-text">
      <Formik
        initialValues={{
          name: "",
          image_url: "",
          location: "",
          description: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          axios
            .post("http://localhost:4005/api/v1/canyon", values)
            .then((res) => console.log(res))
            .catch((err) => console.log("FE error on add canyon", err));
        }}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col space-y-2 mx-auto border border-text rounded-3xl p-7 w-96 shadow-2xl">
          <h1 className="m-auto border-b text-lg">Add a Canyon</h1>
          <label>Canyon Name</label>
          <Field name="name" className="border border-text w-full" />
          <ErrorMessage
            name="name"
            className="border-2 border-error"
            component="div"
          />
          <label>Image URL</label>
          <Field name="image_url" className="border border-text w-full" />
          <ErrorMessage
            name="image_url"
            className="border-2 border-error"
            component="div"
          />
          <label>Location</label>
          <Field name="location" className="border border-text w-full" />
          <ErrorMessage
            name="location"
            className="border-2 border-error"
            component="div"
          />
          <label>Brief Description of Canyon</label>
          <Field
            name="description"
            as="textarea"
            className="border border-text w-full"
            rows="3"
          />
          <ErrorMessage
            name="description"
            className="border-2 border-error"
            component="div"
          />
          <button
            type="submit"
            onClick={canyonHandler}
            className="border border-text bg-apricot"
          >
            Publish Canyon
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CanyonForm;
