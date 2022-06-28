import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Posts from "./Posts";

const Canyon = () => {
  const [canyonState, setCanyonState] = useState({});
  const { canyon } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/v1/canyon", {
        params: { canyon: canyon },
      })
      .then((res) => setCanyonState(res.data[0]))
      .catch((err) => console.log("Error on get canyon single", err));
  }, [canyon]);
  return (
    <div>
      <section className="flex flex-col">
        <h1 className="text-text text-4xl mx-auto m-10">{canyonState.name}</h1>
        <img
          src={canyonState.image_url}
          alt={canyonState.name + " canyon"}
          className="w-2/4 mx-auto"
        />
        <p className="mx-auto min-m-3">Location: {canyonState.location}</p>
        <p className="mx-auto max-w-4xl m-3">{canyonState.description}</p>
        <div className="border-b m-4"></div>
      </section>
      <Posts className="flex flex-row" />
    </div>
  );
};

export default Canyon;
