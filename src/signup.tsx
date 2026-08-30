import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

export default function Signup() {
  return (
    <>
      <Header />
      <h2>Create Account</h2>
      <form id="signup-form">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="button">Back</button>
        <button type="submit">Sign Up</button>
      </form>
      <br />
      <h4>Verification Code</h4>
      <form id="verification-code">
        <label htmlFor="code">Verification Code:</label>
        <input type="text" id="code" name="code" />
        <button type="submit">Confirm</button>
      </form>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  </StrictMode>,
);
