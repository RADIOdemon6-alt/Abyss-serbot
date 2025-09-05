import React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./MainApp"; // اسم الملف الجديد
import "./App.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MainApp />);
