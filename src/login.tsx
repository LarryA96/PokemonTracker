import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./userContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { setUserId } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const signupSuccess = location.state?.signupSuccess;

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`/users/${email}/validate`, {
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

    if (response.ok && data.passwordMatch) {
      setPasswordError(false);
      setUserId(data.user); // Store the user ID in context
      navigate("/home");
      console.log(data);
    } else {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 3000);
    }
  }

  return (
    <>
      <Header />
      <main className="loginPage">
        <div className="carousel">
          <img src="assets/emerald.jpg" alt="Pokemon Emerald" />
          <img src="assets/black2.jpg" alt="Pokemon Black 2" />
          <img src="assets/yellow.jpg" alt="Pokemon Yellow" />
        </div>

        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="loginField">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="loginField">
            <div className="passwordHeader">
              <label htmlFor="password">Password</label>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="loginButtons">
            <button type="submit" id="Login">
              Login
            </button>

            <button
              type="button"
              id="Signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
          {passwordError && (
            <p className="password-error">Incorrect email or password.</p>
          )}

          {signupSuccess && <p className="signup-success">{signupSuccess}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
