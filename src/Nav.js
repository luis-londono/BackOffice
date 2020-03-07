import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles";

function Nav() {
  const activeLink = {
    color: styles.brandColor
  };

  return (
    <nav>
      <NavLink activeStyle={activeLink} to="/" exact>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={activeLink} to="/users">
        Users
      </NavLink>
    </nav>
  );
}

export default Nav;
