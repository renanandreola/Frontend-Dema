import React, { useContext, useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "./Cart.css";
import { CartContext } from "../../Contexts/CartContext";

const Cart = () => {
  const {
    removeFromCart,
    cartItems,
    removeAllCart,
    getTotalCartPrice,
    getTotalCartUnity,
  } = useContext(CartContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-empty">
          <h2>Seu carrinho está vazio 🛒</h2>
          <p>Adicione produtos e volte para concluir sua compra.</p>
          <a href="/">
            <button className="btn-primary">Voltar à loja</button>
          </a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-page">
        <h1 className="cart-title">🛍️ Meu Carrinho</h1>

        <div className="cart-container">
          {/* LADO ESQUERDO — Lista de produtos */}
          <div className="cart-left">
            {cartItems.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="cart-item-info">
                  <img src={product.image} alt={product.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{product.name}</h3>
                    <p className="unit-price">{formatCurrency(product.price)} un.</p>
                    <p className="quantity">Qtd: {product.qtd}</p>
                    <p className="subtotal">
                      <strong>Total: {formatCurrency(product.qtd * product.price)}</strong>
                    </p>
                  </div>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="cart-actions">
              <a href="/" className="btn-secondary">
                Adicionar mais itens
              </a>
              <button className="btn-danger" onClick={removeAllCart}>
                Limpar carrinho
              </button>
            </div>

            <div className="cart-alert">
              ⚠️ Itens sujeitos à confirmação de estoque no momento da compra.
            </div>
          </div>

          {/* LADO DIREITO — Resumo */}
          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <ul>
              <li>
                <span>Total de produtos</span>
                <span>{getTotalCartUnity()}</span>
              </li>
              <li>
                <span>Descontos</span>
                <span>R$ 0,00</span>
              </li>
              <li>
                <span>Frete</span>
                <span>Não selecionado</span>
              </li>
              <li className="total">
                <span>Total a pagar</span>
                <strong>{formatCurrency(getTotalCartPrice())}</strong>
              </li>
            </ul>

            <a href="/checkout" className="btn-primary checkout-btn">
              Confirmar Pedido
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
