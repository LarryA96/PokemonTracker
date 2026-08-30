import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

export default function Stats() {
  return (
    <>
      <Header />
      <Navbar />
      <div id="stats">
        <h2>Most Played Title</h2>
        <img src="" alt="" />
        <h2>Number of Completed Games</h2>
        <p id="completedGames"></p>

        {/* Bar Chart */}

        <p>Total Play Time: </p>
      </div>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Stats />
    </BrowserRouter>
  </StrictMode>,
);
