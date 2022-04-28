import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { setUsername } from "../../../firebase/firebase";

const HamburgerLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 10px 5px;
    a {
      color: #06253c;
      font-size: 20px;
      font-weight: bold;
    }
  }
  @media (max-width: 450px) {
    flex-flow: column nowrap;
    background-color: #909590;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 19;
  }
`;

const RightNav = ({ open, toggleMenu }) => {
  const history = useHistory();

  return (
    <HamburgerLinks open={open}>
      <li onClick={toggleMenu}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={toggleMenu}>
        <Link
          to="/playlist"
          onClick={() => {
            history.push("/playlist");
            setUsername("");
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
