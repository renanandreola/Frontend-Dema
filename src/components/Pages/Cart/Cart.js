import React, { useContext } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import "./Cart.css";
import { CartContext } from "../../Contexts/CartContext";


const Cart = () => {
    const { removeFromCart, cartItems, removeAllCart, getTotalCartPrice, getTotalCartUnity } = useContext(CartContext);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    if (cartItems.length > 0) {
        return (
            <>
                <Header></Header>

                <div className="content-cart-desk">
                    <div className="breadcrumb-custom">
                        <a href="/" className="text-breadcrumb">Página inicial</a>
        
                        <div className="arrow-content">
                            <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="arrow-custom" d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                            </svg>
                        </div>
        
                        <a href="/cart" className="text-breadcrumb">Carrinho</a>
                    </div>
        
                    <div className="cart-title" >
                        <span>Carrinho de compras</span>
                    </div>
        
                    <div className="m-1">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated cart" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">50%</div>
                        </div>

                        {cartItems.map((product) => (
                            <div className="cart-content">
                                <div className="cart-left">
                                    <div className="img-name">
                                        <img className="image-product-cart" src={product.image} alt="" />
                                        <span>{product.name}</span>
                                    </div>
            
                                    <div className="cart-actions">
                                        <button className="remove-cart-product" onClick={() => removeFromCart(product.id)}>Excluir</button>
                                    </div>
                                </div>
            
                                <div className="cart-right">
                                    <div className="product-price-cart">
                                        <span className="text-cart">Valor un.:</span>
                                        <span className="text-cart">{formatCurrency(product.price)}</span>
                                    </div>
            
                                    <div className="product-total">
                                        <span className="text-cart">Qtd.: {product.qtd}</span>
                                        <span className="text-cart">Total:</span>
                                        <span className="text-cart"><strong>{formatCurrency(product.qtd * product.price)}</strong></span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="alert alert-warning mt-4" role="alert">
                            Os itens selecionados estão sujeitos à confirmação de estoque e serão reservados em um momento posterior à conclusão da compra.
                        </div>

                        <div className="actions-cart">
                            <a href="/">
                                <button type="button" className="btn btn-success">Adionar mais itens</button>
                            </a>

                            <button type="button" className="btn btn-danger" onClick={() => removeAllCart()}>Excluir carrinho</button>
                        </div>

                        <div className="jumbotron padding-jumbotron">
                            <span className="cart-resume-title">RESUMO DO CARRINHO</span>
                            <ul className="list-group list-group-flush width-list-cart">
                                <li className="list-group-item align-list-custom"> 
                                    <span>Total de produtos:</span> 
                                    <span>{getTotalCartUnity()}</span>
                                </li>
                                <li className="list-group-item align-list-custom"> 
                                    <span><strong>VALOR TOTAL:</strong></span> 
                                    <span><strong>{formatCurrency(getTotalCartPrice())}</strong></span>
                                </li>
                            </ul>
                        </div>
                    
                        <div>
                            <a href="/checkout">
                                <button type="button" className="btn btn-warning finish-order-btn">
                                    <strong>Confirmar pedido</strong>
                                </button>
                            </a>
                        </div>
                    </div>

                    <Footer></Footer>
                </div>

            </>
        );
    } else {
        return (
            <>
                <Header></Header>

                <div className="breadcrumb-custom">
                    <a href="/" className="text-breadcrumb">Página inicial</a>
    
                    <div className="arrow-content">
                        <svg width="4" height="8" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.372417 0.392843C0.133886 0.641674 -5.69198e-07 0.978276 -5.53861e-07 1.32913C-5.38525e-07 1.67999 0.133886 2.01659 0.372417 2.26542L4.90609 7.0332L0.372417 11.7346C0.133886 11.9834 -7.34347e-08 12.32 -5.80982e-08 12.6709C-4.27617e-08 13.0217 0.133886 13.3583 0.372418 13.6072C0.491475 13.7316 0.633122 13.8304 0.789187 13.8979C0.945252 13.9653 1.11265 14 1.28171 14C1.45078 14 1.61818 13.9653 1.77424 13.8979C1.93031 13.8304 2.07195 13.7316 2.19101 13.6072L7.62117 7.97613C7.74121 7.85267 7.83649 7.70579 7.90151 7.54395C7.96653 7.38211 8 7.20852 8 7.0332C8 6.85788 7.96653 6.68429 7.90151 6.52246C7.83649 6.36062 7.74121 6.21373 7.62117 6.09027L2.19101 0.392843C2.07195 0.268365 1.93031 0.169564 1.77424 0.102139C1.61818 0.0347156 1.45078 -6.34157e-08 1.28171 -5.60255e-08C1.11265 -4.86353e-08 0.945251 0.0347156 0.789186 0.102139C0.633121 0.169564 0.491475 0.268365 0.372417 0.392843Z" fill="#454550"/>
                        </svg>
                    </div>
    
                    <a href="/cart" className="text-breadcrumb">Carrinho</a>
                </div>
    
                <div className="jumbotron m-1">
                    <h3>Carrinho vazio!</h3>
                    <p>Adicione produtos ao carrinho para continuar.</p>

                    <a href="/">
                        <button className="empty-cart">Ir para lista de produtos</button> 
                    </a>
                </div>
               
                <Footer></Footer>
            </>
        );
    }

};

export default Cart;
