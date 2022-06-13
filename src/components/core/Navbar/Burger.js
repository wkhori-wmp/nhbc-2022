import React, { useState } from "react";
import RightNav from "./RightNav";
import { StyledBurger } from "./Navbar.style";

const Burger = () => {
  const open = false;
  function toggleMenu() {
    /*
     * For this TO DO, fix the broken toggleMenu function with the useState hook
     * to keep track of whether the burger menu is open
     */
    console.log("this should open and close the burger menu");
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
