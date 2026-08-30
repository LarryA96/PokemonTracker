import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="nav-item">
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Edit
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Stats
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
