import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <>
      <Header />
      <h2>Forgot Password</h2>
      <form id="forgot-password-form">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button">Back</button>
        <button type="submit">Send Link</button>
      </form>
      <Footer />
    </>
  );
}
