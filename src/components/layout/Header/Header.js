import "./Header.css";
import React, { useState } from "react";
import CartIcon from '../Cart/CartIcon';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const makeSearch = () => {
    console.log(searchTerm);
    navigate("/searchResults", { state: { searchTerm: searchTerm } });
  };

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
          <div className="form-inline my-2 my-lg-0 form-search">
            <input className="form-control input-search" type="search" placeholder="Busque por produtos" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            
            <button className="btn btn-outline-warning my-2 my-sm-0 button-search" type="" onClick={makeSearch}>
              <svg className="svg-search" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path clip-rule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fill-rule="evenodd"></path></svg>
            </button>
          </div>

          <CartIcon />
        </div>
      </div>

      <img className="img-wpp" src={'https://imagepng.org/whatsapp-icone-icon/whatsapp-icone-1/'} onClick={sendWpp} alt="Logo" />
    </>
  );
}

export default Header;
