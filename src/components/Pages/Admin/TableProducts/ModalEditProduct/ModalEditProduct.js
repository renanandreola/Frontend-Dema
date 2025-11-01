import "./ModalEditProduct.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ModalEditProduct = ({ product, closeModal }) => {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    stock: product.stock,
    hasPromotion: product.hasPromotion,
    pricePromotion: product.pricePromotion || "",
    categories: product.categories || [],
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

  const notifySuccessProduct = () => toast.success("Produto editado com sucesso!");
  const notifyErrorProduct = () => toast.error("Erro ao editar produto");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalObject = {
      editedId: product._id,
      editedProduct: {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image: form.image,
        stock: Number(form.stock),
        hasPromotion: form.hasPromotion,
        pricePromotion: form.hasPromotion ? Number(form.pricePromotion) : null,
        categories: form.categories,
      },
    };

    try {
      const response = await axios.post(`${baseURL}/editproduct`, finalObject);
      if (response?.data?.status === 200) {
        notifySuccessProduct();
        setTimeout(() => {
          window.location.pathname = "/homeAdmin";
        }, 1200);
      } else {
        notifyErrorProduct();
      }
    } catch (err) {
      console.error("Erro ao editar produto:", err);
      notifyErrorProduct();
    }
  };

  return (
    <div className="modal">
      <form className="form-custom-modal" onSubmit={handleSubmit}>
        <div className="card-form-modal">
          <div className="modal-header-custom">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
          </div>

          <div>
            <h4>Editar produto</h4>
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Nome:</span>
            <input
              className="input-add-products-modal"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Preço (R$):</span>
            <input
              className="input-add-products-modal"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Descrição:</span>
            <textarea
              className="textarea-custom-modal"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Imagem (URL):</span>
            <input
              className="input-add-products-modal"
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Quantidade em estoque:</span>
            <input
              className="input-add-products-modal"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Categorias:</span>
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

          <div className="content-form-checkbox-modal">
            <span className="span-label-modal">Tem promoção?:</span>
            <input
              className="input-add-products-checkbox-modal"
              type="checkbox"
              name="hasPromotion"
              checked={form.hasPromotion}
              onChange={handleChange}
            />
          </div>

          {form.hasPromotion && (
            <div className="content-form-modal">
              <span className="span-label-modal">Preço promocional (R$):</span>
              <input
                className="input-add-products-modal"
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

          <button className="btn btn-success" type="submit">
            Editar produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEditProduct;
