import React from "react";
import "./InstagramPosts.css";

const posts = [
  {
    image: "https://i.imgur.com/ZGwdliR.jpeg",
    link: "https://www.instagram.com/dema_automotive/p/DTQFN2lDiFk/",
  },
  {
    image: "https://i.imgur.com/49NRtbl.jpeg",
    link: "https://www.instagram.com/dema_automotive/p/DTNgjJQgLy6/",
  },
  {
    image: "https://i.imgur.com/gm1JjmI.jpeg",
    link: "https://www.instagram.com/dema_automotive/reel/DTLq1inj5hL/",
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
