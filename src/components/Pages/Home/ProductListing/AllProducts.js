import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../../layout/ProductCard/Card";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("https://dema-api-d36ba11b74d8.herokuapp.com/dema/products");
      console.log("response: ", response);
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
        {data.map((product) => (
          <Card key={product._id} product={product}></Card>
        ))}
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
