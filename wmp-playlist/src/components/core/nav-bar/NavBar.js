import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link, LinkWrapper } from './NavBar.style';

// Navbar returns a JSX component
// This is a functional component that utilizes hooks
const NavBar = () => {
  const location = useLocation();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link hovercolor='white' to='/'>
          <Typography variant='h6'>WMP Playlist</Typography>
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
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
