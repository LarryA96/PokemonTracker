import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

export default function Resetpwd() {
  return (
    <>
      <Header />
      <h2>Reset Password</h2>
      <form id="reset-form">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="new-password">New Password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="confirm-password">Confirm New Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" />
        <button type="button">Back</button>
        <button type="submit">Submit</button>
      </form>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Resetpwd />
    </BrowserRouter>
  </StrictMode>,
);
