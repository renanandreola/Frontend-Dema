import "./ProductDetails.css";
import React, { useState, useEffect, useContext } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function ProductDetails (props) {
  const location = useLocation();
  const [inputValue, setInputValue] = useState(0);
  const { addToCart } = useContext(CartContext);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  var baseURL = '';
  
  if (window.location.hostname.includes('localhost') || window.location.hostname === 'localhost') {
    baseURL = 'http://localhost:3000/dema/product';
  } else {
    baseURL = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/product';
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = {
        id: location.state.productId
      }

      const response = await axios.post(baseURL, data);

      if (response && response.data && response.data.status === 200) {
        setProductData(response.data.product);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
    }
  }

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

    if (inputValue > productProps.stock) {
      return notifyUnavailableQtd();
    }
   
    addToCart({
      id: productProps._id,
      name: productProps.name,
      price: productProps.price,
      qtd: parseInt(inputValue),
      stock: productProps.stock,
      image: productProps.image
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
      <Header></Header>
      <ToastContainer/>
      <div className="checkout-content">
        {loading ? (
          <div className="listing-products">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Carregando produtos... </span>
            </div>
          </div>
        ) : (

          isMobile ? (
          <div className="m-1">
            <div className="image-content-pdp">
              <img className="image-product-pdp" src={productData.image} alt="" />
            </div>
            <div className="breadcrumb-custom breadcrumb-pdp">
              <a href="/" className="text-breadcrumb">Página inicial</a>
              <div className="arrow-content">
                <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="arrow-custom" d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                </svg>
              </div>
              <a href="/product-details" className="text-breadcrumb">Produto</a>
              <div className="arrow-content">
                <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="arrow-custom" d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                </svg>
              </div>
              <a href="/product-details" className="text-breadcrumb">{productData.name}</a>
            </div>

            <div>
              <div className="product-info-pdp">
                <span className="product-name">{productData.name}</span>
                <span className="product-code">SKU: {productData._id.slice(0, 4)}</span>
                <span className="product-price">{formatCurrency(productData.price)}</span>
                <div className="product-actions">
                  <input className="input-qtd" type="number" value={inputValue} onChange={handleChange} />
                  <button className="btn btn-warning add-cart-custom-pdp" onClick={() => handleAddCart(productData)}>Comprar</button>
                </div>
              </div>
              <div className="product-description-pdp">
                <span className="title-description">Descrição do produto:</span>
                <span className="text-description">{productData.description}</span>
              </div>
            </div>

          </div>
          ) : (
            <div className="m-1">

              <div className="breadcrumb-custom breadcrumb-pdp">
                <a href="/" className="text-breadcrumb">Página inicial</a>
                <div className="arrow-content">
                  <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="arrow-custom" d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                  </svg>
                </div>
                <a href="/product-details" className="text-breadcrumb">Produto</a>
                <div className="arrow-content">
                  <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="arrow-custom" d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                  </svg>
                </div>
                <a href="/product-details" className="text-breadcrumb">{productData.name}</a>
              </div>

              <div className="content-desk-infos">
                <div className="image-content-pdp">
                  <img className="image-product-pdp" src={productData.image} alt="" />
                </div>

                <div className="div-product-info">
                  <div className="product-info-pdp">
                    <span className="product-name-pdp">{productData.name}</span>
                    <span className="product-code">SKU: {productData._id.slice(0, 4)}</span>
                    <span className="product-price">{formatCurrency(productData.price)}</span>
                    <div className="product-actions">
                      <input className="input-qtd-pdp" type="number" value={inputValue} onChange={handleChange} />
                      <button className="btn btn-warning add-cart-custom-pdp" onClick={() => handleAddCart(productData)}>Comprar</button>
                    </div>
                  </div>
                  <div className="product-description-pdp">
                    <span className="title-description">Descrição do produto:</span>
                    <span className="text-description">{productData.description}</span>
                  </div>
                </div>
              </div>


            </div>
          )
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default ProductDetails;
