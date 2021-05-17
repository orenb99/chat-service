import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="nav-bar">
      {user ? (
        <>
          <NavLink className="nav-link" to="/profile" activeClassName="active">
            Profile
          </NavLink>
          <NavLink className="nav-link" to="/chat" activeClassName="active">
            Chat
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="nav-link" to="/sign-in" activeClassName="active">
            Sign In
          </NavLink>
          <NavLink className="nav-link" to="/sign-up" activeClassName="active">
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
