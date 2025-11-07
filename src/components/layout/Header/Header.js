import "./Header.css";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartIcon from "../Cart/CartIcon";
import axios from "axios";


function Header() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const baseURL =
    window.location.hostname.includes("localhost") ||
    window.location.hostname === "localhost"
      ? "http://localhost:3000/dema"
      : "https://dema-api-d36ba11b74d8.herokuapp.com/dema";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseURL}/categories`);
        if (res.data.status === 200) setCategories(res.data.categories);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, [baseURL]);

  const makeSearch = () => {
    navigate("/searchResults", { state: { searchTerm } });
  };

  const sendWpp = () => {
    const message = "Olá, vim pelo seu site! Gostaria de tirar algumas dúvidas!";
    const phoneNumber = "5554996765383";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Agrupar subcategorias
  const mainCategories = categories.filter((cat) => !cat.parent);
  const subcategories = categories.filter((cat) => cat.parent);

  const getSubcategories = (parentId) =>
    subcategories.filter(
      (sub) => sub.parent === parentId || sub.parent?._id === parentId
    );

  return (
    <>
      <header className="header">
        <div className="header-left">
          <a href="/" className="logo-link">
            <img
              className="img-logo"
              src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`}
              alt="Logo"
            />
          </a>

          {/* Botão hamburguer (mobile) */}
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Menu de navegação */}
          <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {mainCategories.map((cat) => (
              <div className="nav-item" key={cat._id}>
                <Link
                  to={`/category/${cat._id}`}
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>

                {getSubcategories(cat._id).length > 0 && (
                  <div className="dropdown">
                    {getSubcategories(cat._id).map((sub) => (
                      <Link
                        key={sub._id}
                        className="dropdown-item"
                        to={`/category/${sub._id}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <div className="form-search">
            <input
              className="input-search"
              type="search"
              placeholder="Buscar produtos..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && makeSearch()}
            />
            <button className="button-search" onClick={makeSearch}>
              <svg
                className="svg-search"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height="22"
                viewBox="0 0 24 24"
                width="22"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 1014 0z"
                ></path>
              </svg>
            </button>
          </div>
          <CartIcon />
        </div>
      </header>

      <img
        className="img-wpp"
        src="https://imagepng.org/wp-content/uploads/2017/08/whatsapp-icone-1.png"
        onClick={sendWpp}
        alt="WhatsApp"
      />
    </>
  );
}

export default Header;
