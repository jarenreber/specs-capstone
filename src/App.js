import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Canyon from "./components/Canyon";
import PostForm from "./components/PostForm";
import Edit from "./components/Edit";
import CanyonForm from "./components/CanyonForm";
import LandingPage from "./components/LandingPage";
import Nav from "./components/Nav";
import "./input.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-row">
      {isLoggedIn ? <Nav setLoginStatus={setLoginStatus} /> : null}
      <Routes>
        <Route
          index
          element={
            isLoggedIn ? (
              <Main />
            ) : (
              <LandingPage setLoginStatus={setLoginStatus} />
            )
          }
        />
        <Route
          path="/canyons/:canyon"
          element={isLoggedIn ? <Canyon /> : <LandingPage />}
        />
        <Route
          path="/createPost"
          element={isLoggedIn ? <PostForm /> : <LandingPage />}
        />
        <Route
          path="/createCanyon"
          element={isLoggedIn ? <CanyonForm /> : <LandingPage />}
        />
        <Route
          path="/editPost"
          element={isLoggedIn ? <Edit /> : <LandingPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
