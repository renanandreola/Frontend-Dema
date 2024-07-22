import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../layout/Card";


function AllProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3030/dema/products"
      );
      console.log("response: ", response);
      setData(response.data.products);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  if (data.length > 0) {
    return (
      <>
        <div className="listing-products">
          <span className="title-page">Linha de produtos</span>
          {data.map((product) => (
            <Card key={product._id} product={product}></Card>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <span className="title-page">Carregando produtos...</span>
    );
  }
}

export default AllProducts;
