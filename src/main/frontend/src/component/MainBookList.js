import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./MainBookList.css";
import { Autoplay } from "swiper/modules";
import img3 from "../assets/Main1.png";
import img1 from "../assets/book1.jpg";

export default function MainBookList() {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      loop={true}
      speed={3000}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img1} className="img"></img>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} className="img"></img>
      </SwiperSlide>
    </Swiper>
  );
}
