import React from "react";
import AllProducts from "./ProductListing/AllProducts";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Carousel from "./Carousel/Carousel";

function Home() {
  return (
    <div className="Home-general">
      <Header></Header>
      {/* <Carousel></Carousel> */}
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
