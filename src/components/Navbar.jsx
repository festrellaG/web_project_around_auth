import React, { useState } from "react";
import "../blocks/navbar.css";
import "../blocks/header.css";

const Navbar = ({ userEmail, handleButtonClick, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  function isOpenMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    handleButtonClick();
  }

  return (
    <div className="navbar">
      <div className={`nav_items ${isOpen && "open"}`}>
        <span>{userEmail}</span>
        <span>
          <button className="header_btn-active" onClick={closeMenu}>
            {buttonText}
          </button>
        </span>
      </div>
      <div className={`nav_toggle ${isOpen && "open"}`} onClick={isOpenMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default Navbar;
