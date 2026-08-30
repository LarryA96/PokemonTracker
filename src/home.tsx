import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />

      <h3>My Games</h3>
      <h3>Sort By:</h3>
      <select>
        <option value="nameA">Name A-Z</option>
        <option value="nameZ">Name Z-A</option>
        <option value="dateAsc">Date Ascending</option>
        <option value="dateDesc">Date Descending</option>
        <option value="mostPlayed">Most Played</option>
      </select>
      <div className="gameList">{/* Game items would be rendered here */}</div>
      <div className="gameOverlay">
        {/* Game overlay content would be rendered here */}
      </div>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </StrictMode>,
);
