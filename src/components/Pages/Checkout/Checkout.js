import "./Checkout.css";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { CartContext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const { cartItems, getTotalCartPrice } = useContext(CartContext);
  const [getOnStore, setGetOnStore] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [addressData, setAddressData] = useState({});
  const [showAddressData, setShowAddressData] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseURL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000/dema/login"
    : "https://dema-api-d36ba11b74d8.herokuapp.com/dema/login";

  const notifyUserNotAccount = () => {
    toast.warn(
      "Parece que você não tem cadastro em nosso site. Preencha seu endereço para prosseguir."
    );
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createLogin = async (event) => {
    event.preventDefault();
    setShowAddressData(false);

    try {
      const response = await axios.post(baseURL, { email: formData.email });

      if (response.data.status === 500) {
        notifyUserNotAccount();
        setIsModalOpen(true);
      }

      if (response.data.status === 200 && response.data.client) {
        const c = response.data.client;
        setAddressData({
          address1: c.address1,
          address2: c.address2,
          address3: c.address3,
          city: c.city,
          county: c.county,
          email: c.email,
          name: c.name,
          postalCode: c.postalCode,
          state: c.state,
        });
        setShowAddressData(true);
      }

      setFormData({ email: "" });
    } catch {
      setFormData({ email: "" });
    }
  };

  const finishOrder = () => {
    let products = "";
    cartItems.forEach((p) => (products += `${p.name} (${p.qtd} un.), \n`));

    const message = `Olá, vim pelo seu site! Gostaria de retirar: \n${products}no total de ${formatCurrency(
      getTotalCartPrice()
    )}`;

    const phoneNumber = "5554996765383";
    window.open(
      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
    navigate("/confirmation");
  };

  const finishOrderShipping = () => navigate("/shipping", { state: { userAddress: addressData } });

  return (
    <>
      <Header />
      <div className="checkout-page">
        <h1 className="checkout-title">🧾 Finalize sua compra</h1>

        <div className="checkout-container">
          <div className="checkout-section">
            <div className="checkout-card">
              <h2>Método de Entrega</h2>
              <p>
                Escolha uma opção de entrega. Estamos operando na cidade de <b>Erechim - RS</b>.
                Para outras localidades, selecione <b>Envio para endereço</b>.
              </p>

              <div className="checkout-options">
                <button
                  className={`btn-option ${getOnStore ? "active" : ""}`}
                  onClick={() => {
                    setGetOnStore(true);
                    setDelivery(false);
                  }}
                >
                  Retirada em loja
                </button>
                <button
                  className={`btn-option ${delivery ? "active" : ""}`}
                  onClick={() => {
                    setDelivery(true);
                    setGetOnStore(false);
                  }}
                >
                  Envio para endereço
                </button>
              </div>
            </div>

            {getOnStore && (
              <div className="checkout-card">
                <h2>📍 Retirada em loja</h2>
                <iframe
                  title="Localização da loja"
                  className="map-frame"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d262.7039098341386!2d-52.27858315248888!3d-27.639737628988467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e3158cf9b8152b%3A0x4ad2f7692d4b3148!2sDemarco%20Hookah!5e0!3m2!1spt-BR!2sbr!4v1720672023292!5m2!1spt-BR!2sbr"
                  loading="lazy"
                ></iframe>

                <p className="store-address">
                  R. Alm. Barroso - Centro, Erechim - RS, 99700-122
                </p>

                <div className="alert-info">
                  Após finalizar, você será redirecionado ao WhatsApp da loja para agendar a
                  retirada.
                </div>

                <button className="btn-primary" onClick={finishOrder}>
                  Finalizar pedido
                </button>
              </div>
            )}

            {delivery && (
              <div className="checkout-card">
                <h2>🚚 Envio para endereço</h2>

                {!showAddressData && (
                  <form onSubmit={createLogin} className="checkout-form">
                    <label htmlFor="email">Digite seu e-mail para buscar seu cadastro:</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      placeholder="exemplo@email.com"
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="btn-primary">
                      Verificar
                    </button>
                  </form>
                )}

                {showAddressData && (
                  <div className="address-card">
                    <h3>{addressData.name}</h3>
                    <p>
                      {addressData.address1}, nº {addressData.address2}
                    </p>
                    <p>
                      {addressData.postalCode}, {addressData.county}, {addressData.city} -{" "}
                      {addressData.state}
                    </p>
                    <p>{addressData.address3}</p>

                    <button
                      className="btn-primary"
                      style={{ marginTop: "12px" }}
                      onClick={finishOrderShipping}
                    >
                      Confirmar e continuar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
