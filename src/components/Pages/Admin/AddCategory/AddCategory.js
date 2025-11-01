import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddCategory.css";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", parent: "" });

  const baseURL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000/dema"
    : "https://dema-api-d36ba11b74d8.herokuapp.com/dema";

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}/categories`);
      if (res.data.status === 200) setCategories(res.data.categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/addcategory`, form);
      if (res.data.status === 200) {
        toast.success("Categoria criada com sucesso!");
        setForm({ name: "", parent: "" });
        fetchCategories();
      } else {
        toast.error("Erro ao criar categoria");
      }
    } catch (err) {
      toast.error("Erro ao criar categoria");
    }
  };

  return (
    <div className="add-category-container">
      <form className="add-category-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Criar Nova Categoria</h2>

        <div className="form-group">
          <label htmlFor="name">Nome da categoria</label>
          <input
            id="name"
            type="text"
            placeholder="Ex: Limpeza Automotiva"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parent">Categoria pai (opcional)</label>
          <select
            id="parent"
            value={form.parent}
            onChange={(e) => setForm({ ...form, parent: e.target.value })}
          >
            <option value="">Sem categoria pai</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Criar Categoria
        </button>
      </form>

      {categories.length > 0 && (
        <div className="category-list">
          <h3>Categorias Existentes</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat._id}>
                <span className="category-name">{cat.name}</span>
                {cat.parent && (
                  <span className="category-parent">
                    {" "}
                    → {cat.parent.name || "Subcategoria"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
