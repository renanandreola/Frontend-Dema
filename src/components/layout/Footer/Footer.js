import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-4">
            <h5>Contato</h5>
            <p>
              <i className="fas fa-phone-alt me-2 text-warning mr-1"></i> (54)9
              9910-1433
            </p>
            {/* <p>
              <i className="fas fa-envelope me-2 text-warning"></i>{" "}
              contato@demaautomotive.com
            </p> */}
          </div>

          <div className="col-md-3 mb-4">
            <h5>Redes Sociais</h5>
            <p>
              <i className="fab fa-instagram me-2 text-warning mr-1"></i>
              <a
                href="https://www.instagram.com/dema_automotive"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-none"
              >
                Instagram
              </a>
            </p>
            <p>
              <i className="fab fa-whatsapp me-2 text-warning mr-1"></i>
              <a
                href="https://wa.me/555499087286"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-none"
              >
                WhatsApp Direto
              </a>
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Endereço</h5>
            <p>
              <i className="fas fa-map-marker-alt me-2 text-warning mr-1"></i>{" "}
              R. Alm. Barroso - Centro
            </p>
            <p>Erechim - RS, 99700-122</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5>Horário</h5>
            <p>Seg a Sab: 09h – 19h</p>
            {/* <p>Sábados: 09h – 19h</p> */}
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center mb-0 text-secondary">
          Desenvolvido por{" "}
          <a
            className="text-muted"
            href="https://andreollatech.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Andreolla Tech
          </a>{" "}
          © {new Date().getFullYear()} Dema Automotive. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
