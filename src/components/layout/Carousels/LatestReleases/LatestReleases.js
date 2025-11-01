import React from "react";
import "./LatestReleases.css";

const releases = [
  {
    name: "D-RET",
    subtitle: "Limpador de borracha",
    image: "https://i.imgur.com/oVixG2M.jpeg",
  },
  {
    name: "BLACK BOOST SPRAY",
    subtitle: "Verniz de Motor",
    image: "https://i.imgur.com/e69zhLw.jpeg",
  },
  {
    name: "SHARK GLASS",
    subtitle: "Limpa vidros",
    image: "https://i.imgur.com/2VFfCNy.jpeg",
  },
  {
    name: "TUI",
    subtitle: "Moto elétrica",
    image: "https://i.imgur.com/mDUmqJO.jpeg",
  },
];

export default function LatestReleases() {
  return (
    <section className="releases-section">
      <h2 className="releases-title">ÚLTIMOS LANÇAMENTOS</h2>
      <div className="releases-grid">
        {releases.map((item, index) => (
          <div className="release-card" key={index}>
            <div className="release-image-container">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="release-info">
              <h3>{item.name}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
