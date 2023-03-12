//import './App.css';

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from "../pages/Home";
import {PostDetails} from "../components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export {App};
