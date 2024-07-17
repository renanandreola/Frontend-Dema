import "./Shipping.css";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../layout/Header";
import { useLocation } from "react-router-dom";


function Shipping() {
    const location = useLocation();
    console.log("location", location);

    return (
        <>
            <Header></Header>

            <div className="checkout-content">
                <div className="cart-title" >
                    <span>Selecione a entrega</span>
                </div>

                <div className="m-1">
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated checkout" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">95%</div>
                    </div>

                    <div className="alert alert-warning mt-4" role="alert">
                        Atualmente estamos em operação voltada para a cidade de Erechim - RS. Para envios fora desta localidade, selecione <strong>"Envio para endereço"</strong> para entrar em contato com a nossa equipe.
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Shipping;
