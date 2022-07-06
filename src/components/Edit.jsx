import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";
import * as Yup from "yup";

const Edit = () => {
  const [postInfo, setPostInfo] = useState({});

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const location = useLocation();
  const { postid } = location.state;

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/v1/post", {
        params: { postid: postid },
      })
      .then((res) => setPostInfo(res.data[0]))
      .catch((err) => console.log("Error on get post to edit", err));
  }, []);

  const deleteHandler = () => {
    MySwal.fire({
      customClass: {
        confirmButton: "bg-aero p-3",
      },
      title: "<h2>Hold Up...</h2>",
      text: "Are you sure you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "Delete Permanently, and Return to Home",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4005/api/v1/post/${postid}`)
          .then(() => navigate("/"))
          .catch((err) => console.log("Error on FE delete", err));
      }
    });
  };

  const cancelHandler = () => {
    navigate("/");
  };

  const validationSchema = Yup.object({
    updatedText: Yup.string().required("You must provide a description"),
  });

  const postUpdated = () => {
    MySwal.fire({
      customClass: {
        confirmButton: "bg-aero p-3",
      },
      title: "<h2>Post Updated!!!</h2>",
      text: "Way to go!!! 👍",
      confirmButtonText: "<Link>Head to Home Page</Link>",
      allowOutsideClick: false,
    }).then(() => navigate("/"));
  };

  return (
    <div className="mt-20 mx-auto text-text">
      <Formik
        enableReinitialize={true}
        initialValues={{
          updatedText: `${postInfo.text}`,
          updatedImg_url: `${postInfo.img_url}`,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          let newValues = { ...values, ...postInfo };
          axios
            .patch("http://localhost:4005/api/v1/post", newValues)
            .then((res) => console.log(res))
            .catch((err) => console.log("FE error on edit post", err));
        }}
      >
        <Form className="flex flex-col space-y-2 mx-auto border border-pinkOfNY rounded-3xl p-7 w-96 shadow-2xl bg-pinkOfNY">
          <h3 className="m-auto border-b text-lg">Edit Post</h3>
          <Field
            className="border border-text"
            name="updatedImg_url"
            placeholder="Enter an image url"
          />
          <Field
            as="textarea"
            name="updatedText"
            placeholder="Enter description"
            rows="3"
            className="border border-text "
          />
          <ErrorMessage name="updatedText" />
          <button
            onClick={cancelHandler}
            className="border border-text  bg-aero"
          >
            Cancel
          </button>
          <button
            className="border border-text p-2 bg-aero"
            type="submit"
            onClick={postUpdated}
          >
            Confirm Edit
          </button>
          <button
            className="border border-text p-2  bg-aero"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Edit;
