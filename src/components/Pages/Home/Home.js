import React from "react";
import AllProducts from "./AllProducts";
import Header from "../../layout/Header";

function Home() {
  return (
    <div className="Home-general">
      <Header></Header>
      <AllProducts></AllProducts>
    </div>
  );
}

export default Home;
