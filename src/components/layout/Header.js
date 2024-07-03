import "./Header.css";
import React, { useState } from "react";

function Header() {

  return (
    <div className="header">
      <div className="header-left">
        <img className="img-logo" src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`} alt="Logo" />
      </div>
      
      <div className="header-right">
        <span>Carrinho</span>
      </div>
    </div>
  );
}

export default Header;
