import './App.css';
import React from 'react';
import RouteComponent from './components/Routes/RouteComponent';
import { CartProvider } from './components/Contexts/CartContext';

export default () =>
    <CartProvider>
        <div className="app">
            <RouteComponent></RouteComponent>
        </div>
    </CartProvider>

