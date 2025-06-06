import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../layout/ProductCard/Card";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var baseURL = "";

    if (
      window.location.hostname.includes("localhost") ||
      window.location.hostname === "localhost"
    ) {
      baseURL = "http://localhost:3000/dema/products";
    } else {
      baseURL = "https://dema-api-d36ba11b74d8.herokuapp.com/dema/products";
    }

    async function fetchData() {
      try {
        const response = await axios.get(baseURL);
        setData(response.data.products.reverse());
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="listing-products loader">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Carregando produtos... </span>
        </div>
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="listing-products">
        <span className="title-page">LINHA DE PRODUTOS DEMA AUTOMOTIVE</span>

        <div className="content-cards">
          {data.map((product) => (
            <Card key={product._id} product={product}></Card>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="listing-products">
        <span className="title-page">Nenhum produto encontrado.</span>
      </div>
    );
  }
}

export default AllProducts;
