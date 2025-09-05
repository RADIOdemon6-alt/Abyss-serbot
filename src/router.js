import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login/Login";
import Home from "./page/home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />        {/* صفحة تسجيل الدخول */}
        <Route path="/home" element={<Home />} />     {/* الصفحة الرئيسية */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
