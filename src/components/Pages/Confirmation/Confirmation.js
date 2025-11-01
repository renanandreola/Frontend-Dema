import "./Confirmation.css";
import React, { useContext } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { CartContext } from "../../Contexts/CartContext";
import { useLocation } from "react-router-dom";

function Confirmation() {
  const { getTotalCartPrice, getTotalCartUnity } = useContext(CartContext);
  const location = useLocation();

  const formatCurrency = (value) => {
    if (location?.state?.shippingMethod) {
      const shipping = parseFloat(
        location.state.shippingMethod.split("-")[1].split("R$")[1]
      );
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value + shipping);
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <>
      <Header />

      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            ✅
          </div>

          <h1 className="confirmation-title">
            Obrigado pela sua compra!
          </h1>

          <p className="confirmation-text">
            {location?.state?.shippingMethod
              ? "Seu pedido foi enviado com sucesso. Estamos preparando tudo para entrega e entraremos em contato em breve."
              : "Seu pedido foi confirmado. Entraremos em contato para combinar a retirada em nossa loja."}
          </p>

          <div className="confirmation-summary">
            <h2>Resumo do pedido</h2>
            <ul>
              <li>
                <span>Produtos:</span>
                <span>{getTotalCartUnity()}</span>
              </li>
              {location?.state?.shippingMethod ? (
                <li>
                  <span>Entrega:</span>
                  <span>{location.state.shippingMethod}</span>
                </li>
              ) : (
                <li>
                  <span>Retirada:</span>
                  <span>R$ 0,00</span>
                </li>
              )}
              <li className="total">
                <span>Total:</span>
                <strong>{formatCurrency(getTotalCartPrice())}</strong>
              </li>
            </ul>
          </div>

          <a href="/" className="btn-primary confirmation-btn">
            Voltar para o início
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Confirmation;
