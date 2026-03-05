"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import Research from "@/pages/Research";
import Blog from "@/pages/Blog";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

export default function Page() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/research" element={<Research />} />
        <Route path="/for-athletes" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
