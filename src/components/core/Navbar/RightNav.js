import React from "react";
import { Link } from "react-router-dom";
import { setPlaylistName } from "../../../firebase/firebase";
import { HamburgerLinks } from "./Navbar.style";

const RightNav = ({ open, toggleMenu }) => {
  return (
    <HamburgerLinks open={open}>
      <li onClick={toggleMenu}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={toggleMenu}>
        <Link
          to="/playlist"
          onClick={() => {
            setPlaylistName("");
          }}
        >
          Playlist
        </Link>
      </li>
      <li onClick={toggleMenu}>
        <Link to="/add-song">Add Song</Link>
      </li>
    </HamburgerLinks>
  );
};

export default RightNav;
