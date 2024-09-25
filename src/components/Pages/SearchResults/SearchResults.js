import React, { useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Card from "../../layout/ProductCard/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  // console.log("location", location);
  // const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(location.state.searchTerm);
  }, [location.state?.searchTerm]);

  var baseURL = '';

  if (window.location.hostname.includes('localhost') || window.location.hostname === 'localhost') {
    baseURL = 'http://localhost:3000/dema/searchResults';
  } else {
    baseURL = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/searchResults';
  }

  async function fetchData(searchTerm) {
    try {
      let search = {
        searchTerm: searchTerm,
      };
      const response = await axios.post(baseURL, search);
      console.log("response: ", response);
      setData(response.data.results);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="listing-products">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Carregando produtos... </span>
        </div>
      </div>
    );
  }

  if (data && data.length > 0) {
    return (
      <div className="">
        <Header></Header>
        <div className="listing-products">
          <span className="title-page">Resultados para "{location.state.searchTerm}"</span>
  
          <div className="content-cards">
            {data.map((product) => (
              <Card key={product._id} product={product}></Card>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  } else {
    return (
      <div className="listing-products">
        <span className="title-page">Nenhum resultado encontrado para "{location.state.searchTerm}"</span>
      </div>
    );
  }
}

export default SearchResults;
