import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Loading from "./pages/Loading.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<App />} />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  </BrowserRouter>
);
