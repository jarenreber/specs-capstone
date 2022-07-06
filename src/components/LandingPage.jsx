import React from "react";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const LandingPage = ({ setLoginStatus }) => {
  return (
    <div className="mx-auto">
      <h1 className="mt-5 text-text border-text text-xl">
        Welcome to Canyon Social! Sign in to view the canyons.
      </h1>
      <LoginForm setLoginStatus={setLoginStatus} />
      <SignUp setLoginStatus={setLoginStatus} />
    </div>
  );
};

export default LandingPage;
