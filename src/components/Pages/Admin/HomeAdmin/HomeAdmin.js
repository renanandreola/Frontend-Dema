import React, { useState } from "react";
import "./HomeAdmin.css";
import Header from "../../../layout/Header/Header";
import Cookies from "js-cookie";
import { ToastContainer } from 'react-toastify';
import AddProduct from "../AddProduct/AddProduct";
import TableProducts from "../TableProducts/TableProducts";
import TableClients from "../TableClients/TableClients";

function HomeAdmin() {
    const token = Cookies.get("token");

    if (!token || token === undefined || token === null) {
        window.location.pathname = "/";
    }

    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                    <TableProducts/>
                }

                {activeTab === 'tab2' && 
                    <TableClients/>
                }

                {activeTab === 'tab3' && 
                    <AddProduct/>
                }
            </div>
        </>
    );
}

export default HomeAdmin;
