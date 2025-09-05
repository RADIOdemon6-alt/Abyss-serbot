importimport React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
); React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./AuthForm"; // اسم الملف الجديد
import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AuthForm />);
