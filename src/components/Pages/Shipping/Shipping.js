import "./Shipping.css";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { shippingOptions } from "./utils/shipping-options";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";

function Shipping() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, getTotalCartPrice } = useContext(CartContext);
  const [selectedValue, setSelectedValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const handleSelectChange = (e) => setSelectedValue(e.target.value);

  const notifyUserNotAccount = () => toast.warn("Parece que você não selecionou seu bairro.");

  const finishShippingOrder = () => {
    if (!selectedValue) return notifyUserNotAccount();

    const addressData = location.state.userAddress;
    const products = cartItems.map((p) => `${p.name} (${p.qtd} un.)`).join(", ");
    const message = `Olá, vim pelo seu site! Gostaria de receber:\n${products}\nNo total de ${formatCurrency(
      getTotalCartPrice()
    )}\nEm: ${addressData.address1}, ${addressData.address2}, ${addressData.postalCode} - ${addressData.county}, ${addressData.city} - ${addressData.state}.\nEntrega: ${selectedValue}`;

    const phoneNumber = "5554999101433";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    navigate("/confirmation", { state: { shippingMethod: selectedValue } });
  };

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="shipping-page">
        <h1 className="shipping-title">🚚 Escolha o método de entrega</h1>

        <div className="shipping-container">
          <div className="shipping-card">
            <h2>Opções de entrega</h2>

            <p className="shipping-description">
              Atualmente atendemos principalmente <b>Erechim - RS</b>.  
              Para outras cidades, selecione <b>"Outra localidade"</b> e finalize o pedido normalmente.
            </p>

            <div className="shipping-select-group">
              <label htmlFor="select-shipping" className="shipping-label">
                Selecione seu bairro ou localidade:
              </label>
              <select
                id="select-shipping"
                className="shipping-select"
                onChange={handleSelectChange}
                value={selectedValue}
              >
                <option value="">Selecione...</option>
                {shippingOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.name} — {option.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="shipping-summary">
              <h3>Resumo do pedido</h3>
              <ul>
                <li>
                  <span>Itens:</span> <span>{cartItems.length}</span>
                </li>
                <li>
                  <span>Valor total:</span> <span>{formatCurrency(getTotalCartPrice())}</span>
                </li>
                <li>
                  <span>Entrega:</span>{" "}
                  <span>{selectedValue || "Não selecionado"}</span>
                </li>
              </ul>
            </div>

            <button className="btn-primary shipping-btn" onClick={finishShippingOrder}>
              Finalizar pedido
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
