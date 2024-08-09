import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomeCommunityList.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HomeCommunityList({ posts }) {
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <div className="community_slide_content">
            <Link to={`/community/${post.id}`}>
              <h5>{post.title}</h5>
            </Link>
            <div className="content_text">{stripHtmlTags(post.content)}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
