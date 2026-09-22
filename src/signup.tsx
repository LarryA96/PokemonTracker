import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setErrorMessage("That email is already registered.");
        return;
      }

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to create account.");
        return;
      }

      // Signup was successful.
      // Send a message to the login page through React Router state.
      navigate("/", {
        state: {
          signupSuccess: "Account created successfully! You can now log in.",
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage("Unable to connect to the server.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <Header />

      <main className="signup-page">
        <div className="signup-container">
          <h2>Create Account</h2>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>

            {errorMessage && <p className="signup-error">{errorMessage}</p>}

            <div className="signup-buttons">
              <button
                type="button"
                className="signup-back-button"
                onClick={handleBack}
              >
                Back
              </button>

              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
