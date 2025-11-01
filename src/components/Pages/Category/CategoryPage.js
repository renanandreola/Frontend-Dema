import React, { useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Card from "../../layout/ProductCard/Card";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CategoryPage.css";

function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

const baseURL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:3000/dema"
    : "https://dema-api-d36ba11b74d8.herokuapp.com/dema";

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log(`${baseURL}/productsByCat?category=${id}`);
        
        const res = await axios.get(`${baseURL}/productsByCat?category=${id}`);
        if (res.data.status === 200) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategoryName() {
      try {
        const res = await axios.get(`${baseURL}/categories`);
        if (res.data.status === 200) {
          const category = res.data.categories.find((cat) => cat._id === id);
          if (category) setCategoryName(category.name);
        }
      } catch (error) {
        console.error("Erro ao buscar nome da categoria:", error);
      }
    }

    fetchProducts();
    fetchCategoryName();
  }, [id, baseURL]);

  if (loading) {
    return (
      <div className="listing-products">
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Carregando produtos...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="listing-products">
        <span className="title-page">
          {categoryName || "Produtos da categoria"}
        </span>

        <div className="content-cards">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p className="no-products">
              Nenhum produto encontrado nesta categoria.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
