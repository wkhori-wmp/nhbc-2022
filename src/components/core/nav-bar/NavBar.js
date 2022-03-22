import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background-color: #61DAFB;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`


const NavBar = () => {
  return (
    <Nav>
      <div className="logo">
      <Link style={{color: "#FFF"}} to="/">
        <img src={"http://txacg.org/wp-content/uploads/2015/08/West-Monroe-Partners_centered.png"} alt="West Monroe logo" height="30px" /> 
      </Link>        
      </div>
      <Burger />
    </Nav>
  )
}

export default NavBar;

// const NavBar = () => {
//   return (
//     <AppBar position='static'>
//       <Toolbar>
//         <Link hovercolor='white' to='/'>
//           <Typography variant='h6'>WMP Playlist</Typography>
//         </Link>
//         <LinkWrapper>
//           <Link
//             $active={location.pathname === '/' || location.pathname === ''}
//             to='/'
//           >
//             Home
//           </Link>
//           <Link $active={location.pathname === '/playlist'} to='/playlist'>
//             Playlist
//           </Link>
//           <Link $active={location.pathname === '/add-song'} to='/add-song'>
//             Add Song
//           </Link>
//         </LinkWrapper>
//       </Toolbar>
//     </AppBar>
//   );
// };