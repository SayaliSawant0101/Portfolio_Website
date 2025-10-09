import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Blog from "./blogs.jsx";
import Post from "./pages/Post.jsx";        // ✅ add this
import ScrollToTop from "./ScrollToTop.jsx"; // (optional, if you have it)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
