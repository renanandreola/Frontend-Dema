import "./Confirmation.css";
import React, { useState, useContext } from "react";
import Header from "../../layout/Header";
import { CartContext } from "../../Contexts/CartContext";

function Confirmation() {
    const { getTotalCartPrice, getTotalCartUnity } = useContext(CartContext);

        const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };
    
  return (
    <>
      <Header></Header>
      <div className="checkout-content">
        <div className="cart-title" >
          <span><strong>Agradecemos pela sua compra!</strong></span>
        </div>

        <div className="m-1">
          <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated confirmation" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">100%</div>
          </div>

          <div className="alert alert-success mt-4" role="alert">
            Seu pedido foi enviado com sucesso! Seus produtos já estão em separação. Iremos utilizar seu contato para agendar a retirada de seu pedido!
          </div>

          <div>
            <img className="img-confirmation" src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`} alt="Logo" />
          </div>

          <div className="jumbotron padding-jumbotron">
              <span className="cart-resume-title">RESUMO DO PEDIDO</span>
              <ul className="list-group list-group-flush width-list-cart">
                  <li className="list-group-item align-list-custom"> 
                      <span>Total de produtos:</span> 
                      <span>{getTotalCartUnity()}</span>
                  </li>
                  <li className="list-group-item align-list-custom"> 
                      <span><strong>TOTAL:</strong></span> 
                      <span><strong>{formatCurrency(getTotalCartPrice())}</strong></span>
                  </li>
              </ul>
          </div>
          
          <hr className="hr-custom"></hr>
          
          <a href="/">
              <button type="button" className="btn btn-warning finish-order-checkout"><strong>Voltar para o início</strong></button>
          </a>
        </div>


      </div>
    </>
  );
}

export default Confirmation;
