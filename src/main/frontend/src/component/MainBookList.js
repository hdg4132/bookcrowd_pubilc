import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./MainBookList.css";
import { Autoplay } from "swiper/modules";
const importAll = (i) => i.keys().map(i);
const book_images = importAll(require.context('../assets/book_images', false,/\.(png|jpe?g|svg)$/));


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
      {book_images.map((src, index) => (
      <SwiperSlide>
        <img key={index} src={src} alt={`Image ${index}`} />
      </SwiperSlide>
      ))}  
    </Swiper>
  );
}
