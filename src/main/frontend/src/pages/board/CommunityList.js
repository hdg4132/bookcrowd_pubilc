import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SubBanner from "../../component/SubBanner";
import "./CommunityList.css";

const formatDate = (date) => {
  if (!date) return "날짜 없음";

  const postDate = new Date(date);
  const now = new Date();
  const diff = Math.abs(now - postDate);
  const diffMinutes = Math.floor(diff / 60000);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  return postDate.toLocaleDateString();
};

export default function CommunityList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/community")
      .then((response) => {
        setPosts(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      });
  }, []);

  const currentItems = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <SubBanner
        page_name={"community"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
        search
      />
      <div className="list_body">
        <div className="container_fix">
          <ul>
            <li className="list_header_top list_header">
              <span className="list_title">제목</span>
              <div className="list_info">
                <span className="title_writer">작성자</span>
                <span className="title_date">게시일</span>
              </div>
            </li>
            {currentItems.map((item) => (
              <li className="list_header" key={item.id}>
                <span className="list_content">
                  <Link to={`/community/${item.id}`}>{item.title}</Link>
                </span>
                <div className="list_info">
                  <span className="writer">{item.writer || "작성자 없음"}</span>
                  <span className="date">{formatDate(item.date)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="community_pagination">
          <button
            onClick={prevPage}
            className="pagination_button arrow"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination_button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className="pagination_button arrow"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
        <div className="write_button_box container_fix">
          <Link to={`/communityEdit`} className="write_button">
            글쓰기
          </Link>
        </div>
      </div>
    </div>
  );
}
