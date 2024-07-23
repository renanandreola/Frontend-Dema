import React, { useState } from 'react';
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    hasPromotion: false,
    pricePromotion: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          [name]: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value
      });
    }
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
      pricePromotion: form.hasPromotion ? Number(form.pricePromotion) : null
    };
    
    console.log(finalObject);

    // "http://localhost:3030/dema/addproduct",

    const response = await axios.post(
      "https://dema-api-d36ba11b74d8.herokuapp.com/dema/addproduct",
      finalObject
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea type="text" name="description" value={form.description} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Stock:
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Has Promotion:
          <input type="checkbox" name="hasPromotion" checked={form.hasPromotion} onChange={handleChange} />
        </label>
      </div>
      {form.hasPromotion && (
        <div>
          <label>
            Promotional Price:
            <input type="number" name="pricePromotion" value={form.pricePromotion} onChange={handleChange} required />
          </label>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
