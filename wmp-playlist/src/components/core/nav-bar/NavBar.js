import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, LinkWrapper } from './NavBar.style';

function NavBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>WMP Playlist</Typography>
        <LinkWrapper>
          <Link to='/'>Home</Link>
          <Link to='/playlist'>Playlist</Link>
          <Link to='/add-song'>Add Song</Link>
        </LinkWrapper>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
