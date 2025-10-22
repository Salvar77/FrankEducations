"use client";
import { useState } from "react";
import classes from "./BurgerMenu.module.scss";

interface BurgerMenuProps {
  isOpen: boolean;
  handleOpen: () => void;
}

const BurgerMenu = ({ isOpen, handleOpen }: BurgerMenuProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOnSpecialPage, setIsOnSpecialPage] = useState(false);

  const toggleActive = () => {
    handleOpen();
  };

  return (
    <div className={classes.hamburgerContainer}>
      <button
        className={`${classes.hamburger} ${classes.hamburger__stand} ${
          isOpen ? classes.isActive : ""
        } ${scrolled || isOnSpecialPage ? classes.scrolled : ""}`}
        type="button"
        onClick={toggleActive}
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
      >
        <span className={classes.hamburgerBox}>
          <span className={classes.hamburgerInner}></span>
        </span>
      </button>
    </div>
  );
};

export default BurgerMenu;
