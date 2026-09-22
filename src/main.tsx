import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserProvider } from "./userContext";

import Login from "./login";
import Home from "./home";
import Edit from "./edit";
import Profile from "./profile";
import Signup from "./signup";
import ForgotPassword from "./forgotPassword";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/PokemonTracker">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
