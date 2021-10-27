import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  margin: 0 auto;
`;

export const MainImage = styled.div`
  display: flex;
  margin: 40px 0px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: #3f51b5;
  padding: 10px 15px;
  width: 100px;
  &:hover {
    background-color: rgba(0, 185, 255, 0.6);
  }
`;

export const Description = styled.div`
  display: flex;
  font-weight: bold;
  width: 330px;
  text-align: center;
  margin: 50px 100px;
`;

