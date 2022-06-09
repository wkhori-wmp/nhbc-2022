import React from "react";
import { Link } from "react-router-dom";
import { HamburgerLinks } from "./Navbar.style";
import { usePlaylistContext } from "../Providers/PlaylistContext";

const RightNav = ({ open, toggleMenu }) => {
  const { selectPlaylist } = usePlaylistContext();
  return (
    <HamburgerLinks open={open}>
      <li onClick={toggleMenu}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={toggleMenu}>
        <Link
          to="/playlist"
          onClick={() => {
            selectPlaylist({ name: "", uuid: "" });
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
