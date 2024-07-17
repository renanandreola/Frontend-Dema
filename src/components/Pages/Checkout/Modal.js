import React, { useState, useEffect } from 'react';
import './Modal.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Modal({ closeModal }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    postalCode: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    county: ""
  });

  const notifyIvalidCep = () => {
    toast.warn('CEP inválido!');
  };

  const notifyErrorCep = () => {
    toast.error('Erro ao buscar o CEP.');
  };

  const notifyAddressAdded = () => {
    toast.success('Endereço salvo!');
  };

  const notifyAddressError = () => {
    toast.error('Erro ao salvar endereço!');
  };

  const handleChangePostalCode = async (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    const newPostalCode = event.target.value;

    if (newPostalCode.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newPostalCode}/json/`);
        if (response.data.erro === "true") {

          notifyIvalidCep();
        
        } else {
          setFormData({
            ...formData,
            address1: response.data.logradouro,
            county: response.data.bairro,
            city: response.data.localidade,
            state: response.data.uf
          });
        }
      } catch (error) {
        
        notifyErrorCep();

        setFormData({
          postalCode: "",
          address1: "",
          address2: "",
          address3: "",
          city: "",
          state: "",
          county: ""
        });
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const sendAddressData = async (event) => {
    event.preventDefault();

    try {
      var data = {
        name: formData.name,
        email: formData.email,
        postalCode: formData.postalCode,
        address1: formData.address1,
        address2: formData.address2,
        address3: formData.address3,
        city: formData.city,
        state: formData.state,
        county: formData.county
      };

      const response = await axios.post(
        "http://localhost:3030/dema/client",
        data
      );

      if(response && response.status === 200) {
        notifyAddressAdded();
        navigate("/shipping", { state: { userAddress: data } });
      } else {
        notifyAddressError();
      } 
      
        
      setFormData({
        name: "",
        email: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        county: ""
      });
    } catch (error) {
      notifyAddressError();

      setFormData({
        name: "",
        email: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        county: ""
      });
    }
  };

  return (
    <>
      <ToastContainer />
      
      <div className="modal">
        <div className="modal-content">
          <div className='modal-header-custom'>
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
          
          <form onSubmit={sendAddressData}>
                  <div className="">
                    <input
                      type="name"
                      name="name"
                      value={formData.name}
                      id="name"
                      className="form-control mb-2 mt-1"
                      placeholder="Nome"
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      id="email"
                      className="form-control mb-2 mt-1"
                      placeholder="E-mail"
                      onChange={handleChange}
                    />
                    <input
                      type="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      id="postalCode"
                      className="form-control mb-2 mt-1"
                      placeholder="Cep"
                      onChange={handleChangePostalCode}
                    />
                    <input
                      type="address1"
                      name="address1"
                      value={formData.address1}
                      id="address1"
                      className="form-control mb-2 mt-1"
                      placeholder="Logradouro"
                      onChange={handleChange}
                    />
                    <input
                      type="address2"
                      name="address2"
                      value={formData.address2}
                      id="address2"
                      className="form-control mb-2 mt-1"
                      placeholder="Número"
                      onChange={handleChange}
                    />
                    <input
                      type="address3"
                      name="address3"
                      value={formData.address3}
                      id="address3"
                      className="form-control mb-2 mt-1"
                      placeholder="Complemento"
                      onChange={handleChange}
                    />
                    <input
                      type="county"
                      name="county"
                      value={formData.county}
                      id="county"
                      className="form-control mb-2 mt-1"
                      placeholder="Bairro"
                      onChange={handleChange}
                    />
                    <input
                      type="city"
                      name="city"
                      value={formData.city}
                      id="city"
                      className="form-control mb-2 mt-1"
                      placeholder="Cidade"
                      onChange={handleChange}
                    />
                    <input
                      type="state"
                      name="state"
                      value={formData.state}
                      id="state"
                      className="form-control mb-2 mt-1"
                      placeholder="Estado"
                      onChange={handleChange}
                    />
                  </div>
          
                  <div className="">
                    <button type="submit" className="btn btn-success verifyIdentity" onclick="sendAddressData()">Salvar e continuar</button>
                  </div>
                </form>
        </div>
      </div>
    </>
  );
}

export default Modal;