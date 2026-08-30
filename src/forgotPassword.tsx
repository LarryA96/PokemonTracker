import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

export default function ForgotPassword() {
  return (
    <>
      <Header />
      <h2>Forgot Password</h2>
      <form id="forgot-password-form">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <button type="button">Back</button>
        <button type="submit">Send Link</button>
      </form>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  </StrictMode>,
);
