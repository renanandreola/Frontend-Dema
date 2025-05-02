import React from "react";
import AllProducts from "./ProductListing/AllProducts";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function Home() {
  return (
    <div className="Home-general">
      <Header></Header>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
