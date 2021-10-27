import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Picture = styled.div`
  display: flex;
  margin: 40px 0px;
`;

export const LinkWrapper = styled.div`
  display: flex;
`;

export const Link = styled(RouterLink)`
  text-decoration: 0;
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 10px 100px;
  padding: 0px 20px;
  background-color: #3f51b5;
  height: 15px;
  width: 100px;
  box-shadow: none;
  border: none;
  padding-top: 8px;
  padding-bottom: 15px;
  &:hover {
    background-color: rgba(0, 185, 255, 0.6);
  }
`;

export const Words = styled.div`
  display: flex;
  font-weight: bold;
  inline-size: 330px;
  text-align: center;
  margin: 50px 100px;
`;

