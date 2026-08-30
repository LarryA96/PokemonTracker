import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

function Login() {
  return (
    <>
      <Header />
      <div className="carosuel">Img Carousel</div>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <Link to="">Forgot Password?</Link>
        <br />
        <button type="submit" id="Login">
          Login
        </button>
        <button type="submit" id="Signup">
          Sign Up
        </button>
      </form>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </StrictMode>,
);
