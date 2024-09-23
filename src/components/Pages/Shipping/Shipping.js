import "./Shipping.css";
import React, { useState, useContext, useEffect } from "react";
import Header from "../../layout/Header/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { shippingOptions } from "./utils/shipping-options";
import { CartContext } from "../../Contexts/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../../layout/Footer/Footer";

function Shipping() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, getTotalCartPrice } = useContext(CartContext);
    const [selectedValue, setSelectedValue] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };  

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const notifyUserNotAccount = () => {
        toast.warn('Parece que você não selecionou seu bairro.');
    };

    function finishShippingOrder() {
        if (selectedValue && selectedValue !== "") {
            var addressData = location.state.userAddress;
        
            var products = "";
        
            cartItems.forEach(product => {
              products += product.name + " (" + product.qtd + " un.), \n"
            });
        
            var message = "Olá, vim pelo seu site! Gostaria de receber: \n" + products + "no total de " + formatCurrency(getTotalCartPrice()) + " em: \n" + addressData.address1 + ', ' + addressData.address2 + ', ' + addressData.postalCode + ' - ' + addressData.county + ', ' + addressData.city + ' - ' + addressData.state + ". \n Entrega: " + selectedValue;
            
            const phoneNumber = '5554999101433';
            const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');

            navigate("/confirmation", { state: { shippingMethod: selectedValue } });
        } else {
            notifyUserNotAccount();
        }
      }

    return (
        isMobile ? (
            <>
                <Header></Header>
                <ToastContainer/>

                <div className="content-cart-desk">
                    <div className="checkout-content">
                        <div className="cart-title" >
                            <span>SELECIONE A ENTREGA</span>
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

                    <Footer></Footer>
                </div>
            </>
        ) : (
            <>
                <Header></Header>
                <ToastContainer/>

                <div className="content-cart-desk">
                    <div className="checkout-content">
                        <div className="cart-title" >
                            <span>SELECIONE A ENTREGA</span>
                        </div>

                        <div className="m-1">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated shipping" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">95%</div>
                            </div>

                            <div className="alert alert-warning mt-4" role="alert">
                                Atualmente estamos em operação voltada para a cidade de Erechim - RS. Para envios fora desta localidade, selecione a opção <strong>"Outra localidade"</strong>.
                            </div>

                            <div className="finish-order-content-desk">
                                <div className="form-group select-group-desk">
                                    <label for="select-shipping">Example select</label>
                                    <select className="form-control" id="select-shipping" onChange={handleSelectChange}>
                                        {shippingOptions.map((shipping) => (
                                            <option key={shipping.id} value={shipping.value}>
                                                {shipping.name} - {shipping.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <a className="btn btn-warning btn-shipping finish-btn-desk" onClick={finishShippingOrder}>Finalizar</a>
                            </div>

                        </div>
                    </div>

                    <Footer></Footer>
                </div>
            </>
        )
    );
}

export default Shipping;
