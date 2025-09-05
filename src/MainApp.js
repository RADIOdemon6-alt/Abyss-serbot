// src/MainApp.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Apl from "./App";
import Home from "./page/home/Home";

function MainApp() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default MainApp;
