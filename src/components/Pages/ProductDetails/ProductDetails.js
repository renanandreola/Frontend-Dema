import "./ProductDetails.css";
import React, { useState, useEffect } from "react";
import Header from "../../layout/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ProductDetails (props) {
  const location = useLocation();

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = {
        id: location.state.productId
      }
      const response = await axios.post(
        "http://localhost:3030/dema/product",
        data
      );
      console.log("response: ", response);

      if (response && response.data && response.data.status === 200) {
        setProductData(response.data.product);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <>
      <Header></Header>
      <div className="checkout-content">
        <div className="m-1">
          <img className="image-product" src={`${productData.image}`} alt="" />
          <span>{productData.name}</span>
          <span>{productData._id}</span>
          <span>{productData.price}</span>
        </div>


      </div>
    </>
  );
};

export default ProductDetails;
