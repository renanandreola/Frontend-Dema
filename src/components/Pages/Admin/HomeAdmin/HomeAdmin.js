import React, { useState, useEffect } from "react";
import "./HomeAdmin.css";
import Header from "../../../layout/Header/Header";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomeAdmin() {
    const token = Cookies.get("token");

    if (!token || token === undefined || token === null) {
        window.location.pathname = "/";
    }

    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [data, setData] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // const baseUrlProducts = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/products' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/products';
    // const baseUrlClients = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/clients' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/clients';
      const baseUrlProducts = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/products';
      const baseUrlClients = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/clients';

    useEffect(() => {
        fetchProductsData();
        fetchClientsData();
    }, []);

    async function fetchProductsData() {
        try {
            const response = await axios.get(baseUrlProducts);
            setData(response.data.products);
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchClientsData() {
        try {
            const response = await axios.get(baseUrlClients);
            setClients(response.data.products);
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <>
                <Header></Header>
                <div className="listing-products">
                    <div class="spinner-border text-warning" role="status">
                        <span class="sr-only">Carregando... </span>
                    </div>
                </div>
            </>
        );
    }

    if (data && clients && data.length > 0 && clients.length > 0) {
        return (
            <>
                <Header></Header>
                <ToastContainer/>
        
                <div className="tabs">
                    <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>Produtos</button>
                    <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>Clientes</button>
                    <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>Inserir Produtos</button>
                </div>
        
                <div className="content">
                    {activeTab === 'tab1' && 
                        <table class="table table-striped table-products">
                            <thead>
                                <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Imagem</th>
                                <th scope="col">Estoque</th>
                                <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product) => (
                                    <tr>
                                        <th scope="row">{product.name}</th>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td>{product.image}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button className="btn btn-warning">Editar</button>
                                            <button className="btn btn-danger">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                    {activeTab === 'tab2' && 
                        <table class="table table-striped table-products">
                            <thead>
                                <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Cep</th>
                                <th scope="col">Rua</th>
                                <th scope="col">N°</th>
                                <th scope="col">Comp.</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Bairro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr>
                                        <th scope="row">{client.name}</th>
                                        <td>{client.email}</td>
                                        <td>{client.postalCode}</td>
                                        <td>{client.address1}</td>
                                        <td>{client.address2}</td>
                                        <td>{client.address3}</td>
                                        <td>{client.city}</td>
                                        <td>{client.state}</td>
                                        <td>{client.county}</td>
                                        <td>
                                            <button className="btn btn-warning">Editar</button>
                                            <button className="btn btn-danger">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header></Header>
                <div className="listing-products">
                    <span className="title-page">Nenhuma informação encontrada.</span>
                </div>
            </>
        );
    }
}

export default HomeAdmin;
