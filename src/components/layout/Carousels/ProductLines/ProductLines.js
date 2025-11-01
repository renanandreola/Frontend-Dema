import React from "react";
import "./ProductLines.css";

const products = [
  { title: "QUÍMICOS", image: "https://i.imgur.com/NpLWUQm.jpeg", link: "https://demautomotive.vercel.app/category/6904e0783865d9fe1e7c7000" },
  { title: "ACESSÓRIOS", image: "https://i.imgur.com/9G8Nz5S.jpeg", link: "https://demautomotive.vercel.app/category/6904e09c3865d9fe1e7c7001" },
  { title: "LIMPEZA PESADA", image: "https://i.imgur.com/TS7FOAf.jpeg", link: "https://demautomotive.vercel.app/category/6904e0a53865d9fe1e7c7002" },
  { title: "POLIMENTO", image: "https://i.imgur.com/Imo8NOM.jpeg", link: "https://demautomotive.vercel.app/category/6904e0c23865d9fe1e7c7003" },
  { title: "AEROSSOL", image: "https://i.imgur.com/cHOpzRg.jpeg", link: "https://demautomotive.vercel.app/category/6904e0dc3865d9fe1e7c7004" },
  { title: "CERAMIC COATING", image: "https://i.imgur.com/dk8S1ho.png", link: "https://demautomotive.vercel.app/category/6904e0f53865d9fe1e7c7005" },
  { title: "LIMPEZA INTERNA", image: "https://i.imgur.com/fj6d9LQ.jpeg",link: "https://demautomotive.vercel.app/category/6904e0fe3865d9fe1e7c7006" },
  { title: "EQUIPAMENTOS", image: "https://i.imgur.com/LQC47pm.jpeg", link: "https://demautomotive.vercel.app/category/6904e1063865d9fe1e7c7007" },
];

export default function ProductLines() {
  return (
    <section className="product-section">
      <h2 className="product-title">LINHAS DE PRODUTOS</h2>

      <div className="product-grid">
        {products.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="product-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={item.image} alt={item.title} className="product-image" />
            <div className="overlay">
              <span>{item.title}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
