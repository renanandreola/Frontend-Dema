import "./ProductDetails.css";
import { useState, useEffect, useContext } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductDetails() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  });

  const baseURL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000/dema/product"
    : "https://dema-api-d36ba11b74d8.herokuapp.com/dema/product";

  async function fetchData() {
    try {
      const response = await axios.post(baseURL, { id: location.state.productId });
      if (response.data?.status === 200) {
        setProductData(response.data.product);
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const notifyInvalidQtd = () =>
    toast.error("Quantidade inválida!", { autoClose: 800 });

  const notifyUnavailableQtd = () =>
    toast.warn("Quantidade indisponível.", { autoClose: 800 });

  const handleAddCart = (product) => {
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

    toast.success("Produto adicionado ao carrinho!", { autoClose: 900 });
  };

  const handleChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value || 0));
    setInputValue(val);
  };

  const handleChangeMore = () => setInputValue(inputValue + 1);
  const handleChangeLess = () => setInputValue(Math.max(0, inputValue - 1));

  return (
    <>
      <Header />
      <ToastContainer />

      {loading ? (
        <div className="pdp-loading">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Carregando produto...</span>
          </div>
        </div>
      ) : (
        <div className="pdp-page">
          <div className="pdp-container">
            {/* === IMAGEM === */}
            <div className="pdp-image-container">
              {productData.image ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  className="pdp-swiper"
                >
                  {productData.image
                    .split(",")
                    .map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img.trim()}
                          alt={`${productData.name} - imagem ${index + 1}`}
                          className="pdp-image"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              ) : (
                <p>Sem imagem disponível</p>
              )}
            </div>


            {/* === INFORMAÇÕES === */}
            <div className="pdp-info">
              <nav className="pdp-breadcrumb">
                <a href="/" className="pdp-link">Início</a> /{" "}
                <span className="pdp-current">{productData.name}</span>
              </nav>

              <h1 className="pdp-name">{productData.name}</h1>
              <p className="pdp-code">SKU: {productData._id?.slice(0, 10)}</p>
              <p className="pdp-price">{formatCurrency(productData.price)}</p>

              <div className="pdp-actions">
                <div className="pdp-quantity">
                  <button onClick={handleChangeLess}>−</button>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                  />
                  <button onClick={handleChangeMore}>+</button>
                </div>

                <button
                  className="btn-primary pdp-add-btn"
                  onClick={() => handleAddCart(productData)}
                >
                  Adicionar ao carrinho
                </button>
              </div>

              <div className="pdp-description">
                <h2>Descrição do produto</h2>
                <p>{productData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProductDetails;
