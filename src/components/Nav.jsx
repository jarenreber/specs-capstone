import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiFillHome, AiFillEdit } from "react-icons/ai";
import { GiCliffCrossing } from "react-icons/gi";
import LogOutButton from "./LogOutButton";

const axios = require("axios");

const Nav = ({ setLoginStatus }) => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/v1/canyons")
      .then((res) => setList(res.data))
      .catch((err) => console.log("Error on get canyon in nav", err));
  }, []);
  const listMapped = list.map((el, index) => {
    return (
      <div>
        <Link
          key={index}
          to={`/canyons/${el.name}`}
          state={{ canyon: `${el.name}` }}
        >
          <h4
            className={`${!open && "scale-0"} border-b text-xl ${
              open && "w-3/4"
            }`}
          >
            {el.name}
          </h4>
        </Link>
      </div>
    );
  });
  return (
    <div className="flex flex-row">
      <nav
        className={`${
          open ? "w-72" : "w-32"
        } duration-300 bg-apricot h-screen sticky top-0`}
      >
        <AiOutlineArrowLeft
          className={`bg-aero relative text-5xl p-3 rounded-full ${
            open && "-right-64 top-5"
          } border border-text cursor-pointer ${
            !open && "rotate-180 -right-24 top-5"
          } duration-300`}
          onClick={() => setOpen(!open)}
        />
        <div className={`w-96 flex flex-col p-5 pt-8 space-y-7 text-text`}>
          <Link to={"/"} className="inline-flex">
            <AiFillHome
              className={`text-slateGray text-4xl cursor-pointer block float-left duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h3
              className={`origin-left font-medium text-2xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Home
            </h3>
          </Link>
          <LogOutButton open={open} setLoginStatus={setLoginStatus} />
          <Link to={"/createPost"} className="inline-flex">
            <AiFillEdit
              className={`text-slateGray text-4xl cursor-pointer block float-left duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h3
              className={`origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Create Post
            </h3>
          </Link>
          {sessionStorage.getItem("isAdmin") === "true" && (
            <Link to={"/createCanyon"}>
              <GiCliffCrossing
                className={`text-slateGray text-4xl cursor-pointer block float-left duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h3
                className={`origin-left font-medium text-xl duration-300 ${
                  !open && "scale-0"
                }`}
              >
                Add Canyon
              </h3>
            </Link>
          )}
          <div
            className={`${!open && "scale-0"} border-b-4 border-wine ${
              open && "w-3/4"
            }`}
          ></div>
          {listMapped}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
