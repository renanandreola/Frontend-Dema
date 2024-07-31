import "./Header.css";
import React, { useState } from "react";
import CartIcon from '../Cart/CartIcon';

function Header() {

  const sendWpp = () => {
    var message = "Olá, vim pelo seu site! Gostaria de tirar algumas dúvidas!";
    const phoneNumber = '5554999101433';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  return (
    <>
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

      <img className="img-wpp" src={'https://imagepng.org/whatsapp-icone-icon/whatsapp-icone-1/'} onClick={sendWpp} alt="Logo" />
    </>
  );
}

export default Header;
