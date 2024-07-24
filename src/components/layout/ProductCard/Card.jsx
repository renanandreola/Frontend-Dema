import "./Card.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from 'react-toastify';

function Card (props) {
  const [inputValue, setInputValue] = useState(0);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const goToProduct = (id) => {
    navigate("/product-details", { state: { productId: id } });
  };

  const notifyInvalidQtd = () => {
    toast.error('Quantidade inválida!', {
      autoClose: 800,
    });
  };

  const notifyUnavailableQtd = () => {
    toast.warn('Quantidade indisponível.', {
      autoClose: 800,
    });
  };

  const handleAddCart = (productProps) => {
    if (!inputValue || inputValue === 0 || inputValue === "0") {
      return notifyInvalidQtd();
    } 
    
    if (inputValue > productProps.product.stock) {
      return notifyUnavailableQtd();
    }
    
    addToCart({
      id: productProps.product._id,
      name: productProps.product.name,
      price: productProps.product.price,
      qtd: parseInt(inputValue),
      stock: productProps.product.stock,
      image: productProps.product.image
    });
  
  }

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
    <>
      <ToastContainer/>

      <div className="Card">
        <div className="card-left" onClick={() => goToProduct(props.product._id)}>
          <img className="image-product" src={`${props.product.image}`} alt="" />
        </div>
        
        <div className="card-right">
          <span className="product-name" onClick={() => goToProduct(props.product._id)}>{props.product.name}</span>
          <span className="product-code">Cód. {props.product._id}</span>
          <span className="product-price">{formatCurrency(props.product.price)}</span>

          <div className="product-actions">
            <input className="input-qtd" type="number" value={inputValue} onChange={handleChange} />
            <button className="btn btn-warning add-cart-custom" onClick={() => handleAddCart(props)}>Comprar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;