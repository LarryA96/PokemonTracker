import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

export default function Profile() {
  return (
    <>
      <Header />
      <Navbar />
      <img src="" alt="" />
      <h2>{/* Holds email address */}</h2>
      <p>Member Since: </p>
      <br />
      <button id="logout">Log Out</button>
      <button id="deleteAccount">Delete Account</button>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  </StrictMode>,
);
