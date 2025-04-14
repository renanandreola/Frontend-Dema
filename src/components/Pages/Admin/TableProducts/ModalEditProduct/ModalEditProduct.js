import "./ModalEditProduct.css";
import React, { useState } from "react";
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
    pricePromotion: product.pricePromotion,
  });

  var baseURL = "";

  if (
    window.location.hostname.includes("localhost") ||
    window.location.hostname === "localhost"
  ) {
    baseURL = "http://localhost:3000/dema/editproduct";
  } else {
    baseURL = "https://dema-api.vercel.app/dema/editproduct";
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
    toast.success("Produto editado com sucesso");
  };

  const notifyErrorProduct = () => {
    toast.error("Erro ao editar produto");
  };

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
      },
    };

    const response = await axios.post(baseURL, finalObject);

    if (response && response.data && response.data.status === 200) {
      notifySuccessProduct();
    } else {
      notifyErrorProduct();
    }

    setTimeout(() => {
      window.location.pathname = "/homeAdmin";
    }, 1200);
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
            <span className="span-label-modal">Preço:</span>
            <input
              className="input-add-products-modal"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <span className="small">Não adicione números negativos</span>
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Descrição:</span>
            <textarea
              className="textarea-custom-modal"
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Imagem:</span>
            <input
              className="input-add-products-modal"
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />
            <span className="small">Adicione o link da imagem</span>
          </div>

          <div className="content-form-modal">
            <span className="span-label-modal">Qtd. em estoque:</span>
            <input
              className="input-add-products-modal"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <span className="small">Não adicione números negativos</span>
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
              <span className="span-label-modal">Preço promocional:</span>
              <input
                className="input-add-products-modal"
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
            Editar produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEditProduct;
