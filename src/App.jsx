import "./App.css";
import React from "react";
import RouteComponent from "./components/Routes/RouteComponent";
import { CartProvider } from "./components/Contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <RouteComponent></RouteComponent>
      </div>
    </CartProvider>
  );
}

export default App;
