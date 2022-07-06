import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LogOutButton = ({ open, setLoginStatus }) => {
  const clearSession = () => {
    sessionStorage.clear();
    setLoginStatus();
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <div>
      <button className="inline-flex" onClick={clearSession}>
        <AiOutlineLogin
          className={`text-slateGray text-4xl cursor-pointer block float-left duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h3
          className={`origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Log Out
        </h3>
      </button>
    </div>
  );
};

export default LogOutButton;
