import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

export default function Edit() {
  return (
    <>
      <Header />
      <Navbar />
      <form id="editForm">
        <label htmlFor="gameName">Game Name:</label>
        <select id="gameName" name="gameName">
          {/* Generated from database */}
        </select>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status">
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select id="type" name="type">
          <option value="Normal">Normal</option>
          <option value="Nuzlocke">Nuzlocke</option>
          <option value="Hardcore Nuzlocke">Hardcore Nuzlocke</option>
        </select>
        <label htmlFor="favoriteButton">Favorite:</label>
        <button type="button" id="favoriteButton" name="favoriteButton">
          <img src="" />
        </button>
        <button type="submit">Save Changes</button>
      </form>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Edit />
    </BrowserRouter>
  </StrictMode>,
);
