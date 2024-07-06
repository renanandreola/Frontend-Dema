import "./CartIcon.css";
import React, { useContext } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from "../Contexts/CartContext";

const CartIcon = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <a className="cart-icon" href="/cart">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <FaShoppingCart size={28} />

                {cartItems.length > 0 && (
                    <span className="cart-number">{cartItems.length}</span>
                )}
            </div>
        </a>
    );
};

export default CartIcon;
