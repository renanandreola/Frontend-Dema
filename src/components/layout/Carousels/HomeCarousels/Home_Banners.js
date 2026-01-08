import "./Home_Banners.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function HomeBanners() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 4000, // tempo em ms entre slides (4s)
        disableOnInteraction: false, // continua rodando mesmo se o usuário interagir
      }}
      loop={true} // volta pro primeiro slide ao chegar no final
    >
      <SwiperSlide>
        <div className="banner-slide">
          <img
            className="img-banner-home"
            src="https://i.imgur.com/gyaPaqL.jpeg"
            alt="Banner 1"
          />
          {/* <div className="banner-text">
            <h2>A revolução da estética automotiva começa aqui.</h2>
            <p>Produtos desenvolvidos para quem exige o máximo do brilho.</p>
          </div> */}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="banner-slide">
          <img
            className="img-banner-home"
            src="https://i.imgur.com/CURCr99.jpeg"
            alt="Banner 2"
          />
          {/* <div className="banner-text">
            <h2>A revolução da estética automotiva começa aqui.</h2>
            <p>Produtos desenvolvidos para quem exige o máximo do brilho.</p>
          </div> */}
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="banner-slide">
          <img
            className="img-banner-home"
            src="https://i.imgur.com/5SclEjx.jpeg"
            alt="Banner 2"
          />
          <div className="banner-text">
            <h2>O máximo em proteção, brilho e durabilidade.</h2>
            <p>O cuidado que transforma o visual do seu carro.</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
