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
    if (location && location.state && location.state.shippingMethod) {
      let shipping = parseFloat(
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
      <Header></Header>

      <div className="content-cart-desk">
        <div className="checkout-content">
          <div className="cart-title">
            <span>
              <strong>AGRADECEMOS PELA SUA COMPRA!</strong>
            </span>
          </div>

          <div className="m-1">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped bg-warning progress-bar-animated confirmation"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                100%
              </div>
            </div>

            {location && location.state && location.state.shippingMethod ? (
              <div className="alert alert-success mt-4" role="alert">
                Seu pedido foi enviado com sucesso! Seus produtos já estão em
                separação. Iremos utilizar seu contato para demais informações
                de entrega.
              </div>
            ) : (
              <div className="alert alert-success mt-4" role="alert">
                Seu pedido foi enviado com sucesso! Seus produtos já estão em
                separação. Iremos utilizar seu contato para agendar a retirada
                de seu pedido!
              </div>
            )}

            {/* <div>
              <img
                className="img-confirmation"
                src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`}
                alt="Logo"
              />
            </div> */}

            <div className="jumbotron padding-jumbotron">
              <span className="cart-resume-title">RESUMO DO PEDIDO</span>
              <ul className="list-group list-group-flush width-list-cart">
                <li className="list-group-item align-list-custom">
                  <span>Total de produtos:</span>
                  <span>{getTotalCartUnity()}</span>
                </li>

                {location && location.state && location.state.shippingMethod ? (
                  <li className="list-group-item align-list-custom">
                    <span>Entrega:</span>
                    <span>{location.state.shippingMethod}</span>
                  </li>
                ) : (
                  <li className="list-group-item align-list-custom">
                    <span>Retirada:</span>
                    <span>R$ 0,00</span>
                  </li>
                )}

                <hr></hr>

                <li className="list-group-item align-list-custom">
                  <span>
                    <strong>TOTAL:</strong>
                  </span>
                  <span>
                    <strong>{formatCurrency(getTotalCartPrice())}</strong>
                  </span>
                </li>
              </ul>
            </div>

            <hr className="hr-custom"></hr>

            <a href="/">
              <button
                type="button"
                className="btn btn-warning finish-order-checkout"
              >
                <strong>Voltar para o início</strong>
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Confirmation;
