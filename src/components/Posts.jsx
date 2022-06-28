import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../input.css";
import { BiUserCircle } from "react-icons/bi";

import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const { canyon } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/v1/posts", {
        params: { canyon: canyon },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log("Error on get posts", err));
  }, [canyon]);
  const postsListed = posts.map((el, index) => {
    console.log(el);
    return (
      <div key={index} className="m-4 border p-3 rounded-xl w-2/5">
        <div className="flex">
          <BiUserCircle className="text-text text-4xl" />
          <h3 className="text-text text-3xl">{el.username}</h3>
        </div>
        <div className="flex flex-col justify-content items-center">
          <p className="m-3">{el.text}</p>
          <img
            src={el.img_url}
            alt={canyon + " canyon"}
            className="w-80 h-80 p-3 object-cover"
          />
          <p className="">{el.date}</p>
          <Link to={"/editPost"} state={{ postid: el.postid }}>
            <button className="border p-2">Edit</button>
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-row sm:flex-wrap justify-center">
      {postsListed}
    </div>
  );
};

export default Posts;
