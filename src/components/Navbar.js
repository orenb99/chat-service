import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user }) {
  return (
    <div className="nav-bar">
      <nav>
        {user ? (
          <>
            <NavLink className="nav-link" to="/" activeClassName="active">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="/chat" activeClassName="active">
              Chat
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="nav-link"
              to="/sign-in"
              activeClassName="active"
            >
              Sign In
            </NavLink>
            <NavLink
              className="nav-link"
              to="/sign-up"
              activeClassName="active"
            >
              Sign up
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
