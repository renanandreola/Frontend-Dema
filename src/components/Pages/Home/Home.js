import React from "react";
import './Home.css'
import AllProducts from "./ProductListing/AllProducts";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Home_Banners from "../../layout/Carousels/HomeCarousels/Home_Banners";
import ProductLines from "../../layout/Carousels/ProductLines/ProductLines";
import LatestReleases from "../../layout/Carousels/LatestReleases/LatestReleases";
import InstagramPosts from "../../layout/Carousels/InstagramPosts/InstagramPosts";

function Home() {
  return (
    <div className="Home-general">
      <Header></Header>
      <div className='swipper-custom-home'>
        <Home_Banners></Home_Banners>
      </div>
      <div className="product-lines">
        <ProductLines></ProductLines>
      </div>
      <div>
        <LatestReleases></LatestReleases>
      </div>
      <div>
        <InstagramPosts></InstagramPosts>
      </div>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
