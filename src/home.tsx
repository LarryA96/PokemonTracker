import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./login";
import "./styles.css";

export default function Home() {
  //Create state variables for the sorting function, games list, and overlay status
  const [sortOption, setSortOption] = useState("nameA");
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [overlay, setOverlay] = useState(false);

  //Preset the return scheme for item objects to prevent initial load errors
  type Game = {
    _id: string;
    name: string;
    CoverArtURL: string;
    generation: string;
    status?: string;
    bestTime?: string;
    totalPlayTime?: number;
  };

  //Fetch games and update state on page load
  useEffect(() => {
    async function getGamesList() {
      try {
        const response = await fetch("http://localhost:3000/games");

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setGamesList(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    getGamesList();
  }, []);

  //Function to sort games based on the selected option
  const sortedGames = [...gamesList].sort((a, b) => {
    switch (sortOption) {
      case "nameA":
        return a.name.localeCompare(b.name);

      case "nameZ":
        return b.name.localeCompare(a.name);

      case "mostPlayed":
        return (b.totalPlayTime ?? 0) - (a.totalPlayTime ?? 0);

      default:
        return 0;
    }
  });

  return (
    <>
      <Header />
      <Navbar />

      <h3>My Games</h3>
      <h3>Sort By:</h3>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="nameA">Name A-Z</option>
        <option value="nameZ">Name Z-A</option>
        <option value="dateAsc">Date Ascending</option>
        <option value="dateDesc">Date Descending</option>
        <option value="mostPlayed">Most Played</option>
      </select>
      <div className="gameList">
        {sortedGames.map((item) => (
          <div key={item._id} className="gameCard">
            <img
              src={item.CoverArtURL}
              alt={item.name}
              width="200"
              height="280"
              loading="lazy"
              decoding="async"
              onClick={() => {
                setOverlay(!overlay);
                setGame(item);
              }}
            />
            <h4>{item.name}</h4>
            <p>Status: {item.status}</p>
            {item.bestTime && <p>Best Time: {item.bestTime}</p>}
            {item.totalPlayTime && (
              <p>Total Play Time: {item.totalPlayTime} hours</p>
            )}
          </div>
        ))}
      </div>

      {/** Overlay widget below */}
      {overlay && (
        <div className="gameOverlay">
          <h2 onClick={() => setOverlay(!overlay)}>X</h2>
        </div>
      )}
      <div className="gameOverlay"></div>
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
