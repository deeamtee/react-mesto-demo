import React from "react";
import headerLogo from "../images/logo-header.svg";
import headerLine from "../images/Line.svg"

function Header({ text }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo" />
      <div className="header__about">
        <p className="header__mail">email@mail.com</p>
        <p className="header__nav">{text}</p>
        <img src={headerLine} alt="line" className="header__line" />
        <img src={headerLine} alt="line" className="header__line" />
        <img src={headerLine} alt="line" className="header__line" />
      </div>
    </header>
  );
}

export default Header;