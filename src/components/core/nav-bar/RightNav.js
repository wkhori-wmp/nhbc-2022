import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HamburgerLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    color: #FFF;
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #000;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
  }
`;

const RightNav = ({ open }) => {
  return (
    <HamburgerLinks open={open}>        
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
      <Link to="/playlist">
          Playlist
        </Link>
      </li>
      <li>
        <Link to="/add-song">
          Add Song
        </Link>
      </li>
    </HamburgerLinks>
  )
}

export default RightNav