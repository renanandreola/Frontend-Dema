import React, { useState } from 'react';
import './Modal.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Modal({ closeModal }) {
  const navigate = useNavigate();

  // const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/client' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/client';
  const baseURL = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/client';

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

  const notifyEmptyFields = () => {
    toast.error('Preencha todos os campos!');
  };

  const handleChangePostalCode = async (event) => {
    const newPostalCode = event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      postalCode: newPostalCode,
    }));

    if (newPostalCode.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newPostalCode}/json/`);

        if (response.data.erro) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            postalCode: "",
            address1: "",
            address2: "",
            address3: "",
            city: "",
            state: "",
            county: ""
          }));

          return notifyIvalidCep();
        } 

        setFormData((prevFormData) => ({
          ...prevFormData,
          address1: response.data.logradouro,
          county: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf
        }));
        
      } catch (error) {
        notifyErrorCep();
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          postalCode: "",
          address1: "",
          address2: "",
          address3: "",
          city: "",
          state: "",
          county: ""
        }));
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const areFieldsFilled = () => {
    return Object.values(formData).every(field => field.trim() !== "");
  };

  const sendAddressData = async (event) => {
    event.preventDefault();

    if (!areFieldsFilled()) {
      return notifyEmptyFields();
    }

    try {
      const data = {
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

      const response = await axios.post(baseURL, data);

      if (response && response.status === 200) {
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
            <div>
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
            <div>
              <button type="submit" className="btn btn-success verifyIdentity">Salvar e continuar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
