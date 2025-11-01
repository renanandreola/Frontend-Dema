import "./Card.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";

function Card({ product }) {
  const [inputValue, setInputValue] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const goToProduct = () => navigate("/product-details", { state: { productId: product._id } });

  const notifyInvalidQtd = () => toast.error("Quantidade inválida!", { autoClose: 800 });
  const notifyUnavailableQtd = () => toast.warn("Quantidade indisponível.", { autoClose: 800 });

  const handleAddCart = () => {
    if (!inputValue || inputValue <= 0) return notifyInvalidQtd();
    if (inputValue > product.stock) return notifyUnavailableQtd();

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      qtd: parseInt(inputValue),
      stock: product.stock,
      image: product.image,
    });
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <>
      <ToastContainer />
      <div className="Card-modern">
        <div className="Card-image-wrapper" onClick={goToProduct}>
          <img src={product.image} alt={product.name} className="Card-image" loading="lazy" />
        </div>

        <div className="Card-info">
          <h3 className="Card-title" onClick={goToProduct}>
            {product.name}
          </h3>
          <span className="Card-price">{formatCurrency(product.price)}</span>

          <div className="Card-controls">
            <div className="Card-quantity">
              <button onClick={() => setInputValue(Math.max(0, inputValue - 1))}>-</button>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
              />
              <button onClick={() => setInputValue(inputValue + 1)}>+</button>
            </div>

            <button className="Card-buy" onClick={handleAddCart}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
