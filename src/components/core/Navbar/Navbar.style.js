import styled from "styled-components";

export const NavBarWrapper = styled.nav`
  width: 100%;
  height: 55px;
  background-color: #909590;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`;

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  cursor: pointer;
  @media (max-width: 450px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  // transition 'hamburger' icon into 'close' icon
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#003D6A" : "#003D6A")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const HamburgerLinks = styled.ul`
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
