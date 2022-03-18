import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: ${({ $active }) => (!!$active ? 'lightgray' : 'white')};
  margin: 0 5px;
  padding: 5px;

  ${({ $active }) => (!!$active ? 'border-bottom: 1px solid lightgray' : '')};

  &:hover {
    color: ${({ hovercolor }) => (hovercolor ? hovercolor : 'lightgray')};
    width: 250px;
  }
`;

export const LinkWrapper = styled.div`
  margin-left: auto;
`;

export const NavbarWrapper = styled.div`
  position: static;
  background-color: blue;
  display: flex;
  height: 50px;
  align-items: center;
`;
