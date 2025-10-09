import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Blog from "./blogs.jsx";
import ScrollToTop from "./ScrollToTop.jsx";   // ✅ import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />   {/* ✅ this makes sure every route loads at top */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  </React.StrictMode>
);