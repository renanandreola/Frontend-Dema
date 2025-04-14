import React, { useEffect, useState } from "react";

function Carousel() {
  return (
    <>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src={`${process.env.PUBLIC_URL}/LÂMINA DE VENDAS_DEKTOP.png`}
              class="d-block w-100"
              alt="..."
            ></img>
          </div>
          <div class="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/BANNER WEB LINHA BLEND.png`}
              class="d-block w-100"
              alt="..."
            ></img>
          </div>
          <div class="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/BANNER2.png`}
              class="d-block w-100"
              alt="..."
            ></img>
          </div>
          <div class="carousel-item">
            <img
              src={`${process.env.PUBLIC_URL}/BANNER WEB DELET 500ML - 2050171.png`}
              class="d-block w-100"
              alt="..."
            ></img>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
