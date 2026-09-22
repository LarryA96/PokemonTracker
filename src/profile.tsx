import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useUser } from "./userContext";
import "./styles.css";

export default function Profile() {
  const { userId, logout } = useUser();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<{
    email: string;
    creationDate: string;
    favoriteGameName: string | null;
    CoverArtURL: string | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchUserData(userId);
  }, [userId]);

  async function fetchUserData(userId: string) {
    try {
      const response1 = await fetch(`/users/${userId}`);
      const response2 = await fetch(`/userGames/${userId}/favorite`);

      if (!response1.ok) {
        throw new Error(`Failed to fetch user data: ${response1.statusText}`);
      }

      if (!response2.ok) {
        throw new Error(
          `Failed to fetch favorite game: ${response2.statusText}`,
        );
      }

      const data = await response1.json();
      const favoriteGame = await response2.json();

      setUserData({
        email: data.email ?? "",
        creationDate: data.creationDate ?? "",
        favoriteGameName: favoriteGame?.name ?? null,
        CoverArtURL: favoriteGame?.CoverArtURL ?? null,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setShowLogoutOverlay(true);
  }

  function confirmLogout() {
    logout();
    setShowLogoutOverlay(false);

    // Navigate back to the home page.
    navigate("/");
  }

  function cancelLogout() {
    setShowLogoutOverlay(false);
  }

  function handleDeleteAccount() {
    setDeleteEmail("");
    setDeleteError("");
    setShowDeleteOverlay(true);
  }

  function cancelDeleteAccount() {
    setShowDeleteOverlay(false);
    setDeleteEmail("");
    setDeleteError("");
  }

  async function confirmDeleteAccount() {
    if (!userData?.email) {
      setDeleteError("Unable to verify your account email.");
      return;
    }

    if (deleteEmail.trim().toLowerCase() !== userData.email.toLowerCase()) {
      setDeleteError("The email address does not match your account.");
      return;
    }

    try {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.statusText}`);
      }

      // Account was successfully deleted.
      logout();
      setShowDeleteOverlay(false);

      // Return to home page.
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      setDeleteError("Failed to delete account. Please try again.");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />

        <main className="profile">
          <p>Loading profile...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <Header />
        <Navbar />

        <main className="profile">
          <h2>You are not logged in.</h2>
          <button onClick={() => navigate("/")}>Return Home</button>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="profile">
        {userData?.CoverArtURL ? (
          <img
            src={userData.CoverArtURL}
            alt={userData.favoriteGameName ?? "Favorite game"}
          />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0jWi-rNSVZE6Ct9R6aLZ7hKQ-vo0Jta5kOWFnFVcU3ZGe2DzJ6Le2uVD&s=10"
            alt="No favorite game"
          />
        )}

        <h2>{userData?.email ?? "Email unavailable"}</h2>

        <p>
          Member Since:{" "}
          {userData?.creationDate
            ? new Date(userData.creationDate).toLocaleDateString()
            : "Date unavailable"}
        </p>

        <div className="profile-actions">
          <button id="logout" onClick={handleLogout}>
            Log Out
          </button>

          <button id="deleteAccount" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </main>

      <Footer />

      {/* LOGOUT OVERLAY */}
      {showLogoutOverlay && (
        <div className="overlay">
          <div className="overlayBox">
            <h2>Log Out?</h2>

            <p>Are you sure you want to log out?</p>

            <div className="overlayButtons">
              <button onClick={confirmLogout}>Yes, Log Out</button>

              <button onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT OVERLAY */}
      {showDeleteOverlay && (
        <div className="overlay">
          <div className="overlayBox">
            <h2>Delete Account</h2>

            <p>This will permanently delete your account and your game data.</p>

            <p>Type your email address below to confirm:</p>

            <input
              type="email"
              value={deleteEmail}
              onChange={(event) => {
                setDeleteEmail(event.target.value);
                setDeleteError("");
              }}
              placeholder="Enter your email"
            />

            {deleteError && <p className="deleteError">{deleteError}</p>}

            <div className="overlayButtons">
              <button
                id="confirmDelete"
                onClick={confirmDeleteAccount}
                disabled={!deleteEmail.trim()}
              >
                Delete My Account
              </button>

              <button onClick={cancelDeleteAccount}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
