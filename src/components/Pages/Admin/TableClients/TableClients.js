import React, { useState, useEffect } from "react";
import "./TableClients.css";
import axios from "axios";

function TableClients() {

    const [clients, setClients] = useState([]);

    // const baseUrlClients = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/clients' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/clients';
      const baseUrlClients = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/clients';

    useEffect(() => {
        fetchClientsData();
    }, []);

    async function fetchClientsData() {
        try {
            const response = await axios.get(baseUrlClients);
            setClients(response.data.products);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    return (
        <table className="table table-striped table-products">
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
                    <tr key={client._id}>
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
                            {/* <button className="btn btn-warning">Editar</button> */}
                            <button className="btn btn-danger">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableClients;
