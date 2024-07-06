import "./Header.css";
import React, { useState } from "react";
import CartIcon from './CartIcon';

function Header() {

  return (
    <div className="header">
      <div className="header-left">
        <a href="/">
          <img className="img-logo" src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`} alt="Logo" />
        </a>
      </div>
      
      <div className="header-right">
        <CartIcon />
      </div>
    </div>
  );
}

export default Header;
