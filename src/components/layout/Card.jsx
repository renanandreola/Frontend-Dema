import "./Card.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Contexts/CartContext";

function Card (props) {
  const [inputValue, setInputValue] = useState(0);
  const navigate = useNavigate();

  const { addToCart, removeFromCart } = useContext(CartContext);

  const goToProduct = (code, name) => {
    navigate("/product-details", { state: { code: code, name: name } });
  };


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="Card">
      <div className="card-left">
        <img className="image-product" src={`${process.env.PUBLIC_URL}/hidracouro-500ml.png`} alt="" />
        {/* <span>{props.product.image}</span> */}
      </div>
      
      <div className="card-right">
        <span className="product-name">{props.product.name}</span>
        <span className="product-code">Cód. {props.product._id}</span>
        <span className="product-price">{formatCurrency(props.product.price)}</span>

        <div className="product-actions">
          <input className="input-qtd" type="number" value={inputValue} onChange={handleChange} />
          <button className="btn btn-warning" onClick={() => addToCart({
            id: props.product._id,
            name: props.product.name,
            price: props.product.price,
            qtd: parseInt(inputValue),
            stock: props.product.stock
          })}>Comprar</button>
          {/* <button className="btn btn-danger" onClick={() => removeFromCart(props.product._id)}>Remover</button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;