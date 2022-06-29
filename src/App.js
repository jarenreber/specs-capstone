import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Main from "./components/Main";
import Canyon from "./components/Canyon";
import LoginForm from "./components/LoginForm";
import PostForm from "./components/PostForm";
import Edit from "./components/Edit";
import CanyonForm from "./components/CanyonForm";
import "./input.css";

function App() {
  return (
    <div className="bg-white flex flex-row ">
      <Nav />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/canyons/:canyon" element={<Canyon />} />
        <Route path="/createPost" element={<PostForm />} />
        <Route path="/createCanyon" element={<CanyonForm />} />
        <Route path="/editPost" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
