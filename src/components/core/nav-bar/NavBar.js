import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, LinkWrapper, NavbarWrapper } from './NavBar.style';

// Navbar returns a JSX component
// This is a functional component that utilizes hooks
const NavBar = () => {
  const location = useLocation();
  return (
    <NavbarWrapper>
        <Link hovercolor='white' to='/'>
          <div>WMP Playlist</div>
        </Link>
        <LinkWrapper>
          <Link
            $active={location.pathname === '/' || location.pathname === ''}
            to='/'
          >
            Home
          </Link>
          <Link $active={location.pathname === '/playlist'} to='/playlist'>
            Playlist
          </Link>
          <Link $active={location.pathname === '/add-song'} to='/add-song'>
            Add Song
          </Link>
        </LinkWrapper>
    </NavbarWrapper>
  );
};

export default NavBar;
