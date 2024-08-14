import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomeBookList.css";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeBookList() {
  const [bookImages, setBookImages] = useState([]);
  const book = JSON.parse(localStorage.getItem("book"));

  useEffect(() => {
    axios.get('http://localhost:8080/books')
      .then(response => {
        const images = response.data.map(book => book.bookImgUrl);
        setBookImages(images);
      })
      .catch(error => {
        console.error('Error fetching book images:', error);
      });
  }, []);

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={30}
      loop={true} 
      speed={3000}
      autoplay={{ delay: 0, disableOnInteraction: false }} 
      modules={[Autoplay]}
    >
      {bookImages.map((imgUrl, index) => (
        <SwiperSlide key={index}>
          <img src={`http://localhost:8080/files/${imgUrl}`} alt={`Book ${index + 1}`}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
