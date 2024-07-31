import "./Checkout.css";
import React, { useState, useContext } from "react";
import Header from "../../layout/Header/Header";
import { CartContext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal/Modal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
  const { cartItems, getTotalCartPrice } = useContext(CartContext);
  const [getOnStore, setGetOnStore] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const [addressData, setAddressData] = useState({});
  const [showAddressData, setShowAddressData] = useState(false);

  const [formData, setFormData] = useState({
    email: ""
  });

  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/login' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/login';

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifyUserNotAccount = () => {
    toast.warn('Parece que você não tem cadastro em nosso site. Preencha seu endereço para prosseguir.');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showGetOnStore = () => {
    setGetOnStore(true);
    setDelivery(false);
  };

  const showDelivery = () => {
    setGetOnStore(false);
    setDelivery(true);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
  };  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createLogin = async (event) => {
    event.preventDefault();
    setShowAddressData(false);

    try {
      var data = {
        email: formData.email
      };

      const response = await axios.post(baseURL, data);

      if (response.data.status === 500) {
        notifyUserNotAccount();
        openModal();
      }

      if (response.data.status === 200 && response.data.client) {
        setAddressData({
          address1: response.data.client.address1,
          address2: response.data.client.address2,
          address3: response.data.client.address3,
          city: response.data.client.city,
          county: response.data.client.county,
          email: response.data.client.email,
          name: response.data.client.name,
          postalCode: response.data.client.postalCode,
          state: response.data.client.state
        });

        setShowAddressData(true);
      }

      setFormData({
        email: ""
      });
    } catch (error) {
      setFormData({
        email: ""
      });
    }
  };

  function finishOrder() {
    var products = "";

    cartItems.forEach(product => {
      products += product.name + " (" + product.qtd + " un.), "
    });

    var message = "Olá, vim pelo seu site! Gostaria de retirar " + products + "no total de " + formatCurrency(getTotalCartPrice());

    const phoneNumber = '5554999101433';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    navigate("/confirmation");
  }

  function finishOrderShipping() {
    navigate("/shipping", { state: { userAddress: addressData } });
  }

  return (
    <>
      <Header></Header>

      <div className="content-cart-desk">
        <div className="checkout-content">
          <div className="cart-title" >
            <span>Finalize sua compra</span>
          </div>

          <div className="m-1">
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated checkout" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
            </div>

            <div className="alert alert-warning mt-4" role="alert">
              Atualmente estamos em operação voltada para a cidade de Erechim - RS. Para envios fora desta localidade, selecione <strong>"Envio para endereço"</strong> para entrar em contato com a nossa equipe.
            </div>

            <div className="jumbotron padding-jumbotron">
              <div className="title-checkout-content">
                <svg className="svg-custom" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 9.43862V13.8246C0 14.0572 0.0985122 14.2803 0.273865 14.4449C0.449218 14.6094 0.687047 14.7018 0.935034 14.7018H1.87007C1.87007 15.3997 2.1656 16.0691 2.69166 16.5626C3.21772 17.0561 3.93121 17.3334 4.67517 17.3334C5.41913 17.3334 6.13262 17.0561 6.65868 16.5626C7.18473 16.0691 7.48027 15.3997 7.48027 14.7018H13.0905C13.0905 15.3997 13.386 16.0691 13.9121 16.5626C14.4381 17.0561 15.1516 17.3334 15.8956 17.3334C16.6395 17.3334 17.353 17.0561 17.8791 16.5626C18.4051 16.0691 18.7007 15.3997 18.7007 14.7018H19.6357C19.8837 14.7018 20.1215 14.6094 20.2969 14.4449C20.4722 14.2803 20.5707 14.0572 20.5707 13.8246V3.29827C20.5707 2.60033 20.2752 1.93098 19.7491 1.43746C19.2231 0.943942 18.5096 0.666687 17.7656 0.666687H9.35034C8.60638 0.666687 7.89289 0.943942 7.36683 1.43746C6.84077 1.93098 6.54524 2.60033 6.54524 3.29827V5.05265H4.67517C4.23969 5.05265 3.81019 5.14777 3.42069 5.33048C3.03119 5.51318 2.69237 5.77845 2.43109 6.10528L0.187007 8.9123C0.159658 8.95043 0.13766 8.99171 0.121554 9.03511L0.0654524 9.1316C0.0241856 9.22943 0.00201504 9.33342 0 9.43862ZM14.9605 14.7018C14.9605 14.5283 15.0154 14.3587 15.1181 14.2144C15.2209 14.0702 15.3669 13.9577 15.5378 13.8914C15.7086 13.825 15.8966 13.8076 16.078 13.8414C16.2594 13.8753 16.426 13.9588 16.5567 14.0815C16.6875 14.2042 16.7766 14.3605 16.8126 14.5306C16.8487 14.7008 16.8302 14.8772 16.7594 15.0375C16.6887 15.1977 16.5688 15.3347 16.4151 15.4311C16.2613 15.5275 16.0805 15.579 15.8956 15.579C15.6476 15.579 15.4098 15.4866 15.2344 15.322C15.0591 15.1575 14.9605 14.9344 14.9605 14.7018ZM8.41531 3.29827C8.41531 3.06562 8.51382 2.8425 8.68917 2.678C8.86452 2.51349 9.10235 2.42107 9.35034 2.42107H17.7656C18.0136 2.42107 18.2515 2.51349 18.4268 2.678C18.6022 2.8425 18.7007 3.06562 18.7007 3.29827V12.9474H17.9713C17.7084 12.676 17.388 12.4592 17.0305 12.3108C16.673 12.1625 16.2865 12.0858 15.8956 12.0858C15.5047 12.0858 15.1181 12.1625 14.7606 12.3108C14.4032 12.4592 14.0827 12.676 13.8198 12.9474H8.41531V3.29827ZM6.54524 8.56142H2.8051L3.92714 7.15792C4.01424 7.04897 4.12717 6.96055 4.25701 6.89965C4.38684 6.83874 4.53001 6.80704 4.67517 6.80704H6.54524V8.56142ZM3.74014 14.7018C3.74014 14.5283 3.79497 14.3587 3.89772 14.2144C4.00046 14.0702 4.14649 13.9577 4.31735 13.8914C4.4882 13.825 4.67621 13.8076 4.85759 13.8414C5.03896 13.8753 5.20557 13.9588 5.33634 14.0815C5.4671 14.2042 5.55616 14.3605 5.59224 14.5306C5.62832 14.7008 5.6098 14.8772 5.53903 15.0375C5.46826 15.1977 5.34841 15.3347 5.19465 15.4311C5.04088 15.5275 4.8601 15.579 4.67517 15.579C4.42718 15.579 4.18935 15.4866 4.014 15.322C3.83865 15.1575 3.74014 14.9344 3.74014 14.7018ZM1.87007 10.3158H6.54524V12.7544C5.99341 12.2917 5.26904 12.0524 4.52995 12.0885C3.79086 12.1247 3.09695 12.4334 2.59939 12.9474H1.87007V10.3158Z" fill="#E18800"/>
                </svg>
                <span className="cart-resume-title">MÉTODO DE ENTREGA</span>
              </div>
              <button type="button" className="btn btn-warning shipping-method" onClick={showGetOnStore}>Retirada em loja</button>
              <hr></hr>
              <button type="button" className="btn btn-warning shipping-method" onClick={showDelivery}>Envio para endereço</button>
            </div>

            {getOnStore && (
              <>
                <hr className="hr-custom"></hr>
                <span className="text-address-selected">Você selecionou <strong>Retirada em loja</strong></span>
                <iframe className="iframe-custom" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d262.7039098341386!2d-52.27858315248888!3d-27.639737628988467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e3158cf9b8152b%3A0x4ad2f7692d4b3148!2sDemarco%20Hookah!5e0!3m2!1spt-BR!2sbr!4v1720672023292!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                
                <span className="address-dema">R. Alm. Barroso - Centro, Erechim - RS, 99700-122</span>

                <div className="alert alert-primary mt-4" role="alert">
                  Ao finalizar seu pedido, você será redirecionado para o contato de nossa loja, podendo assim agendar sua retirada.
                </div>
                <hr></hr>
                <button type="button" className="btn btn-success finish-order-checkout" onClick={finishOrder}><strong>Finalizar pedido</strong></button>
              </>
            )}

            {delivery && (
              <div>
                <div>
                  <span className="text-form">Confirme sua identidade para continuar</span>
                </div>

                {showAddressData && addressData &&
                  <div className="address-data">
                    <div className="card">
                      <div className="card-header">
                        {addressData.name}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{addressData.address1}, n°{addressData.address2}</h5>
                        <p className="card-text">{addressData.postalCode}, {addressData.county}, {addressData.city} - {addressData.state}, {addressData.address3}</p>
                        <a className="btn btn-warning btn-user-address" onClick={finishOrderShipping}>Confirmar e continuar</a>
                      </div>
                    </div>
                  </div>
                }

                <form onSubmit={createLogin}>
                  <div className="">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      id="email"
                      className="form-control mb-2 mt-1"
                      placeholder="E-mail"
                      onChange={handleChange}
                    />
                  </div>
          
                  <div className="">
                    <button type="submit" className="btn btn-success verifyIdentity">Verificar</button>
                  </div>
                </form>
              </div>
            )}

            {isModalOpen && <Modal closeModal={closeModal} />}

          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;
