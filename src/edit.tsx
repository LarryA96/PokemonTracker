import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useUser } from "./userContext";
import "./styles.css";

// Preset the return scheme for item objects to prevent initial load errors
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

export default function Edit() {
  const { userId } = useUser();
  const [gamesList, setGamesList] = useState<Game[]>([]);

  // Currently selected game
  const [gameId, setGameId] = useState("");

  // Form values
  const [status, setStatus] = useState("not_started");
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  // Save message
  const [saveMessage, setSaveMessage] = useState("");

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

        // Select the first game by default
        if (data.length > 0) {
          setGameId(data[0].gameId);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    getGamesList();
  }, [userId]);

  // Find selected game
  const selectedGame = gamesList.find((game) => game.gameId === gameId);

  // Load selected game's current information into the form
  useEffect(() => {
    if (!selectedGame) {
      return;
    }

    setStatus(selectedGame.status || "not_started");
    setNotes(selectedGame.notes || "");
    setIsFavorite(selectedGame.isFavorite ?? false);
  }, [selectedGame]);

  // Sort games alphabetically
  const sortedGames = [...gamesList].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId || !gameId) {
      console.error("User ID or game ID is missing.");
      return;
    }

    // Clear previous save message
    setSaveMessage("");

    console.log("Sending update:", {
      userId,
      gameId,
      status,
      notes,
      isFavorite,
    });

    try {
      const response = await fetch(
        `http://localhost:3000/userGames/${userId}/${gameId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            notes,
            isFavorite,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update game information");
      }

      console.log("Game updated:", data);

      // Update local state
      setGamesList((currentGames) =>
        currentGames.map((game) =>
          game.gameId === gameId
            ? {
                ...game,
                status,
                notes,
                isFavorite,
              }
            : game,
        ),
      );

      // Show success message
      setSaveMessage("Changes saved successfully!");

      // Hide message after 3 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating game information:", error);
    }
  }

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <form id="editForm" onSubmit={handleUpdate}>
          <label htmlFor="gameName">Game Name:</label>

          <select
            id="gameName"
            name="gameName"
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
          >
            {sortedGames.map((game) => (
              <option key={game.gameId} value={game.gameId}>
                {game.name}
              </option>
            ))}
          </select>

          <label htmlFor="status">Status:</label>

          <select
            id="status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Completed</option>
          </select>

          <label htmlFor="notes">Notes:</label>

          <textarea
            id="notes"
            name="notes"
            rows={4}
            cols={50}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />

          <label htmlFor="favoriteButton">Favorite:</label>

          <button
            type="button"
            id="favoriteButton"
            name="favoriteButton"
            onClick={() => setIsFavorite((current) => !current)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "★ Favorited" : "☆ Favorite"}
          </button>

          <button type="submit">Save Changes</button>

          {saveMessage && <p className="saveMessage">{saveMessage}</p>}
        </form>
      </main>

      <Footer />
    </>
  );
}
