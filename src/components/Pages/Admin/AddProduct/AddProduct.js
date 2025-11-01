import "./AddProduct.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    hasPromotion: false,
    pricePromotion: "",
    categories: [],
  });

  const [categories, setCategories] = useState([]);

  const baseURL =
    window.location.hostname.includes("localhost") ||
    window.location.hostname === "localhost"
      ? "http://localhost:3000/dema"
      : "https://dema-api-d36ba11b74d8.herokuapp.com/dema";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${baseURL}/categories`);
        if (res.data.status === 200) setCategories(res.data.categories);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, [baseURL]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          [name]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else if (name === "categories") {
      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setForm({ ...form, categories: selected });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const notifySuccessProduct = () =>
    toast.success("Produto cadastrado com sucesso!");
  const notifyErrorProduct = () => toast.error("Erro ao cadastrar produto");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalObject = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      stock: Number(form.stock),
      hasPromotion: form.hasPromotion,
      pricePromotion: form.hasPromotion ? Number(form.pricePromotion) : null,
      categories: form.categories,
    };

    try {
      const response = await axios.post(`${baseURL}/addproduct`, finalObject);

      if (response?.data?.status === 200) {
        notifySuccessProduct();
        setForm({
          name: "",
          price: "",
          description: "",
          image: "",
          stock: "",
          hasPromotion: false,
          pricePromotion: "",
          categories: [],
        });
      } else {
        notifyErrorProduct();
      }
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err);
      notifyErrorProduct();
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Cadastro de Produto</h2>

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Digite o nome do produto"
          />
        </div>

        <div className="form-group">
          <label>Preço (R$)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Breve descrição do produto..."
          />
        </div>

        <div className="form-group">
          <label>Imagem (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="form-group">
          <label>Quantidade em estoque</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Categorias</label>
          <select
            multiple
            name="categories"
            value={form.categories}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.parent ? `↳ ${cat.name} (${cat.parent.name})` : cat.name}
              </option>
            ))}
          </select>
          <small>Segure Ctrl para selecionar várias</small>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="hasPromotion"
              checked={form.hasPromotion}
              onChange={handleChange}
            />
            Possui promoção?
          </label>
        </div>

        {form.hasPromotion && (
          <div className="form-group">
            <label>Preço promocional (R$)</label>
            <input
              type="number"
              name="pricePromotion"
              value={form.pricePromotion}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
        )}

        <button type="submit" className="btn-submit">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
