import React from "react";
import { Link } from "react-router-dom";
import Burger from "./Burger";
import { NavBarWrapper } from "./Navbar.style";

const Navbar = () => {
  return (
    <NavBarWrapper>
      <div className="logo">
        <Link to="/">
          <img
            src="http://txacg.org/wp-content/uploads/2015/08/West-Monroe-Partners_centered.png"
            alt="West Monroe logo"
            height="30px"
          />
        </Link>
      </div>
      <Burger />
    </NavBarWrapper>
  );
};

export default Navbar;
