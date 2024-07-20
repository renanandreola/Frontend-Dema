import "./Shipping.css";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../layout/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { shippingOptions } from "./utils/shipping-options";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from 'react-toastify';

function Shipping() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, getTotalCartPrice } = useContext(CartContext);

    const [selectedValue, setSelectedValue] = useState('');

    console.log("location", location);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };  

    const handleSelectChange = (event) => {
        console.log(event);
        setSelectedValue(event.target.value);
    };

    const notifyUserNotAccount = () => {
        toast.warn('Parece que você não selecionou seu bairro.');
    };

    function finishShippingOrder() {
        // console.log("cartItems: ", cartItems);

        if (selectedValue && selectedValue !== "") {
            var addressData = location.state.userAddress;
        
            var products = "";
        
            cartItems.forEach(product => {
              products += product.name + " (" + product.qtd + " un.), "
            });
        
            var message = "Olá, vim pelo seu site! Gostaria de receber " + products + "no total de " + formatCurrency(getTotalCartPrice()) + " em: " + addressData.address1 + ', ' + addressData.address2 + ', ' + addressData.postalCode + ' - ' + addressData.county + ', ' + addressData.city + ' - ' + addressData.state + ". Entrega: " + selectedValue;
            
            const phoneNumber = '5554999087286';
            const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            navigate("/confirmation", { state: { shippingMethod: selectedValue } });
        } else {
            notifyUserNotAccount();
        }
      }

    return (
        <>
            <Header></Header>
            <ToastContainer/>

            <div className="checkout-content">
                <div className="cart-title" >
                    <span>Selecione a entrega</span>
                </div>

                <div className="m-1">
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated shipping" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">95%</div>
                    </div>

                    <div className="alert alert-warning mt-4" role="alert">
                        Atualmente estamos em operação voltada para a cidade de Erechim - RS. Para envios fora desta localidade, selecione a opção <strong>"Outra localidade"</strong>.
                    </div>
                
                    <div className="form-group">
                        <label for="select-shipping">Example select</label>
                        <select className="form-control" id="select-shipping" onChange={handleSelectChange}>
                            {shippingOptions.map((shipping) => (
                                <option key={shipping.id} value={shipping.value}>
                                    {shipping.name} - {shipping.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <a className="btn btn-warning btn-shipping" onClick={finishShippingOrder}>Finalizar</a>

                </div>

                
            </div>
        </>
    );
}

export default Shipping;
