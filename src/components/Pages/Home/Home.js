import React from "react";
import AllProducts from "./AllProducts";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function Home() {
  return (
    <div className="Home-general">
      <Header></Header>
      <AllProducts></AllProducts>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default Home;
