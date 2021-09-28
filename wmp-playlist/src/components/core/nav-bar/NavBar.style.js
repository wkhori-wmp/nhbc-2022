import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: white;
  margin: 0 5px;
  padding: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
    width: 250px;
  }
`;

export const LinkWrapper = styled.div`
  margin-left: auto;
`;
