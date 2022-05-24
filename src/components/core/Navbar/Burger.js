import React, { useState } from "react";
import RightNav from "./RightNav";
import { StyledBurger } from "./Navbar.style";

const Burger = () => {
  const [open, setOpen] = useState(false);
  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <>
      <StyledBurger open={open} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} toggleMenu={toggleMenu} />
    </>
  );
};

export default Burger;
