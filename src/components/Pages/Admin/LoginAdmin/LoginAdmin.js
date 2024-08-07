import React, { useState, useEffect } from "react";
import "./LoginAdmin.css";
import Header from "../../../layout/Header/Header";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const notifyLoginError = () => {
    toast.error('Login inválido.');
  };

  const notifyLoginSuccess = () => {
    toast.success('Login efetuado.');
  };

  const createLogin = async (event) => {
    event.preventDefault();
    try {

      var data = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        "http://localhost:3000/dema/loginAdmin",
        data
      );

      if (response.data.status === 500) {
        notifyLoginError();
      }

      if (response.data.status === 200) {
        notifyLoginSuccess();

        const currentTime = new Date().getTime();

        const tenMinutesFromNow = new Date(currentTime + 50 * 60 * 1000);

        Cookies.set("token", response.data.token, {
          expires: tenMinutesFromNow,
        });

        const token = Cookies.get("token");

        // console.log("token: ", token);

        navigate("/homeAdmin");
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      notifyLoginError();

      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <Header></Header>
      <ToastContainer/>

      <div className="content-login">
        <div>
            <img className="img-logo-admin" src={`${process.env.PUBLIC_URL}/Dema-logo-2.png`} alt="Logo" />
        </div>

        <div className="login-info">
            <h2 className="login-title">Acesso administrador</h2>
            <form className="input-fields" onSubmit={createLogin}>
                <div class="form-group content-field">
                    <label for="email">Endereço de e-mail</label>
                    <div class="input-icon icon-username"></div>
                    <input class="form-control email-admin" id="email" name="email" placeholder="admin@admin.com" type="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div class="form-group content-field">
                    <label for="email">Senha</label>
                    <div class="input-icon icon-password"></div>
                    <input class="form-control email-admin" type="password" name="password" value={formData.password} id="password" placeholder="Senha" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-warning admin-btn">Entrar</button>
            </form>

        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
