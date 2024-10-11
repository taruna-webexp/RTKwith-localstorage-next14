"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      className="w-full mb-8"
      autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3 seconds
    >
      <SwiperSlide>
        <img src="/assets/1.webp" alt="Banner 1" width="100%" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/2.webp" alt="Banner 2" width="100%" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/3.webp" alt="Banner 3" width="100%" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/assets/5.webp" alt="Banner 4" width="100%" />
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerCarousel;
