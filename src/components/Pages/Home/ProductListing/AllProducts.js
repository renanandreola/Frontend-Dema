import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../layout/ProductCard/Card";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/products' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/products';

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(baseURL);
      setData(response.data.products);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="listing-products">
        <span className="title-page">Carregando produtos...</span>
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="listing-products">
        <span className="title-page">Linha de produtos DEMA</span>

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
