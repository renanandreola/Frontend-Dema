import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../layout/ProductCard/Card";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let baseURL = "";

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
        const products = response.data.products.reverse();

        // Reordena: os produtos "snow foam" vão para o início
        const ordered = [...products].sort((a, b) => {
          const term = "snow foam";
          const aHas = a.name?.toLowerCase().includes(term) || a.description?.toLowerCase().includes(term);
          const bHas = b.name?.toLowerCase().includes(term) || b.description?.toLowerCase().includes(term);

          if (aHas && !bHas) return -1; // a vem antes
          if (!aHas && bHas) return 1;  // b vem antes
          return 0; // mantém a ordem original entre iguais
        });

        setData(ordered);
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
          <span className="sr-only">Carregando produtos...</span>
        </div>
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="listing-products">
        <div className="content-cards">
          {data.map((product) => (
            <Card key={product._id} product={product} />
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
