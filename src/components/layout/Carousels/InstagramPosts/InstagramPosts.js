import React from "react";
import "./InstagramPosts.css";

const posts = [
  {
    image: "https://i.imgur.com/8ly40x4.jpeg",
    link: "https://www.instagram.com/akinasociety/p/DRKVZHaEXoS/",
  },
  {
    image: "https://i.imgur.com/te4i570.jpeg",
    link: "https://www.instagram.com/dema_automotive/reel/DRAqmb4D286/",
  },
  {
    image: "https://i.imgur.com/dcj8D1Y.jpeg",
    link: "https://www.instagram.com/dema_automotive/reel/DQ-ErVFj4SD/",
  },
];

export default function InstagramPosts() {
  return (
    <section className="insta-section">
      <h2 className="insta-title">POSTS DO INSTAGRAM</h2>

      <div className="insta-grid">
        {posts.map((post, index) => (
          <a
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-card"
          >
            <img src={post.image} alt={`Post ${index + 1}`} />
            <div className="insta-overlay">
              <i className="fab fa-instagram"></i>
            </div>
          </a>
        ))}
      </div>

      <p className="insta-text">
        Acompanhe nosso Instagram para ver lançamentos, bastidores e dicas de
        aplicação dos nossos produtos. Fique por dentro das novidades da marca!
      </p>

      <a
        href="https://www.instagram.com/dema_automotive"
        target="_blank"
        rel="noopener noreferrer"
        className="insta-button"
      >
        VER NO INSTAGRAM
      </a>
    </section>
  );
}
