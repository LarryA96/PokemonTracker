import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useUser } from "./userContext";
import "./styles.css";

export default function Home() {
  const { userId } = useUser();
  //Create state variables for the sorting function, games list, and overlay status
  const [sortOption, setSortOption] = useState("nameA");
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [overlay, setOverlay] = useState(false);

  //Preset the return scheme for item objects to prevent initial load errors
  type Game = {
    _id: string;
    userId: string;
    gameId: string;
    status: string;
    notes: string;
    name: string;
    generation: string;
    CoverArtURL: string;
    isFavorite: boolean;
  };

  //Fetch games and update state on page load
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    async function getGamesList() {
      try {
        const response = await fetch(
          `http://localhost:3000/userGames/${userId}`,
        );

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
  }, [userId]);

  //Function to sort games based on the selected option
  const sortedGames = [...gamesList].sort((a, b) => {
    switch (sortOption) {
      case "nameA":
        return a.name.localeCompare(b.name);

      case "nameZ":
        return b.name.localeCompare(a.name);

      default:
        return 0;
    }
  });

  //Function to handle status display
  function getStatusText(status?: string) {
    switch (status) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "complete":
        return "Completed";
      default:
        return "Unknown";
    }
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="gameListHeader">
        <h3>My Games</h3>
        <div className="sortControls">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="nameA">Name A-Z</option>
            <option value="nameZ">Name Z-A</option>
          </select>
        </div>
      </div>
      <div className="gameList">
        {sortedGames.map((item) => (
          <div
            key={item._id}
            className="gameCard"
            onClick={() => {
              setOverlay(!overlay);
              setGame(item);
            }}
          >
            <img
              src={item.CoverArtURL}
              alt={item.name}
              loading="lazy"
              decoding="async"
            />
            <h4>{item.name}</h4>
            <p>Status: {getStatusText(item.status)}</p>
            {item.isFavorite && <p>❤️ Favorite</p>}
          </div>
        ))}
      </div>

      {/** Overlay widget below */}
      {overlay && (
        <div className="gameOverlay">
          <div className="gameOverlayContent">
            <h2 onClick={() => setOverlay(!overlay)}>X</h2>
            <img src={game?.CoverArtURL} alt={game?.name} />
            <h3>{game?.name}</h3>
            <p>Status: {getStatusText(game?.status)}</p>
            <p>Generation: {game?.generation}</p>
            <p>Notes: {game?.notes}</p>
            <p>Favorite: {game?.isFavorite ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
