import React from "react";
import "../input.css";
import homeHero from "../images/homeHero.jpeg";

const Main = () => {
  let username = sessionStorage.getItem("username");
  return (
    <div className="m-10 w-full flex flex-col items-center bg-white mt-12 text-text">
      <h1 className="text-3xl font-bold">Hello There!</h1>
      <h2 className="text-xl pt-6">
        Welcome {`${username}`} to Canyon Social!
      </h2>
      <div>
        <img src={homeHero} alt="Zion National Park" className=" p-20 m-0" />
      </div>
    </div>
  );
};

export default Main;
