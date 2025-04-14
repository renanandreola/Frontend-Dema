import "./AddProduct.css";
import React, { useState } from "react";
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
  });

  var baseURL = "";

  if (
    window.location.hostname.includes("localhost") ||
    window.location.hostname === "localhost"
  ) {
    baseURL = "http://localhost:3000/dema/addproduct";
  } else {
    baseURL = "https://dema-api.vercel.app/dema/addproduct";
  }

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
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const notifySuccessProduct = () => {
    toast.success("Produto cadastrado com sucesso");
  };

  const notifyErrorProduct = () => {
    toast.error("Erro ao cadastrar produto");
  };

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
    };

    const response = await axios.post(baseURL, finalObject);

    if (response && response.data && response.data.status === 200) {
      notifySuccessProduct();
    } else {
      notifyErrorProduct();
    }

    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
      stock: "",
      hasPromotion: false,
      pricePromotion: "",
    });
  };

  return (
    <form className="form-custom" onSubmit={handleSubmit}>
      <div className="card-form">
        <div className="content-form">
          <span className="span-label">Nome:</span>
          <input
            className="input-add-products"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-form">
          <span className="span-label">Preço:</span>
          <input
            className="input-add-products"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <span className="small">Não adicione números negativos</span>
        </div>

        <div className="content-form">
          <span className="span-label">Descrição:</span>
          <textarea
            className="textarea-custom"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="content-form">
          <span className="span-label">Imagem:</span>
          <input
            className="input-add-products"
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />
          <span className="small">Adicione o link da imagem</span>
        </div>

        <div className="content-form">
          <span className="span-label">Qtd. em estoque:</span>
          <input
            className="input-add-products"
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
          <span className="small">Não adicione números negativos</span>
        </div>

        <div className="content-form-checkbox">
          <span className="span-label">Tem promoção?:</span>
          <input
            className="input-add-products-checkbox"
            type="checkbox"
            name="hasPromotion"
            checked={form.hasPromotion}
            onChange={handleChange}
          />
        </div>

        {form.hasPromotion && (
          <div className="content-form">
            <span className="span-label">Preço promocional:</span>
            <input
              className="input-add-products"
              type="number"
              name="pricePromotion"
              value={form.pricePromotion}
              onChange={handleChange}
              required
            />
            <span className="small">Não adicione números negativos</span>
          </div>
        )}

        <button className="btn btn-success" type="submit">
          Cadastrar produto
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
