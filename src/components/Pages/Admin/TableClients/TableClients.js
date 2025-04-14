import React, { useState, useEffect } from "react";
import "./TableClients.css";
import axios from "axios";
import { toast } from "react-toastify";

function TableClients() {
  const [clients, setClients] = useState([]);

  var baseUrlClients = "";
  var baseUrlRemoveClients = "";

  if (
    window.location.hostname.includes("localhost") ||
    window.location.hostname === "localhost"
  ) {
    baseUrlClients = "http://localhost:3000/dema/clients";
    baseUrlRemoveClients = "http://localhost:3000/dema/removeClient";
  } else {
    baseUrlClients = "https://dema-api.vercel.app/dema/clients";
    baseUrlRemoveClients = "https://dema-api.vercel.app/dema/removeClient";
  }

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

  const notifySuccessClient = () => {
    toast.success("Produto excluído com sucesso");
  };

  const notifyeErrorClient = () => {
    toast.error("Erro ao excluir produto");
  };

  const removeClient = async (id) => {
    try {
      var data = {
        id: id,
      };

      const responseRemove = await axios.post(baseUrlRemoveClients, data);

      if (responseRemove.data.status === 200) {
        notifySuccessClient();
      } else {
        notifyeErrorClient();
      }

      window.location.pathname = "/homeAdmin";
    } catch (error) {
      console.error("Erro:", error);
      notifyeErrorClient();
    }
  };

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
              <button
                className="btn btn-danger"
                onClick={() => removeClient(client._id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableClients;
