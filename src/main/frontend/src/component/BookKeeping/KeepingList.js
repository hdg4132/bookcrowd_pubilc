import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";
import { getCurrentDateTime, toDateTime } from "../../util/util";
import SubBanner from "../SubBanner";

export default function KeepingList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      fetchAllKeepings(parsedUserData.userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const keyword = query.get("search") || '';
    const noResults = query.get("noResults") === 'true';
    const error = query.get("error") === 'true';
    setSearchKeyword(keyword);
    if (userData) {
      if (error) {
        setError({ message: "검색 중 오류가 발생했습니다." });
      } else {
        fetchData(page, keyword);
      }
    }
    if (noResults) {
      setFilteredData([]);
      setTotalPages(0);
    }
  }, [page, userData, location.search]);

  const fetchData = (page, keyword = "") => {
    setLoading(true);
    axios
      .get(`/api/keepings/${userData.userId}`, {
        params: {
          page: page,
          size: 10,
          keyword: keyword
        }
      })
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setFilteredData(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const fetchAllKeepings = (userId) => {
    axios
      .get(`/api/keepings/all/${userId}`)
      .then((response) => {
        sessionStorage.setItem("keepingList", JSON.stringify(response.data));
        console.log("Saved to sessionStorage:");
      })
      .catch((error) => {
        console.error("Error fetching all keepings:", error);
      });
  };

  const handleRowClick = (keepingId) => {
    navigate(`/book/${keepingId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const keepStatusMap = {
    0: "승인대기",
    1: "보관중",
    2: "대여중",
    3: "반환 신청",
    4: "반환 완료",
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(0); // 검색 시 페이지를 첫 페이지로 설정
    fetchData(0, keyword);
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const renderTableBody = () => {
    if (filteredData.length === 0) {
      if (searchKeyword) {
        return (
          <tr>
            <td colSpan="4">검색 결과가 없습니다.</td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td colSpan="4">
              데이터가 없습니다.
              <button onClick={handleRegisterClick}>등록하기</button>
            </td>
          </tr>
        );
      }
    } else {
      return filteredData.map((item) => (
        <tr key={item.keepingId} onClick={() => handleRowClick(item.keepingId)}>
          <td className="col-title">{item.bookName}</td>
          <td className="col-status">{keepStatusMap[item.keepStatus]}</td>
          <td className="col-author">{userData.name}</td>
          <td className="col-date">{toDateTime(item.keepDate)}</td>
        </tr>
      ));
    }
  };

  return (
    <>
      <SubBanner
        page_name={"storage"}
        title_en={"Book Storage"}
        title_kr={"책 보관하기"}
        search
        onSearch={handleSearch}
        searchKeyword={searchKeyword}
      />
      <div className="book-keeping-container">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th className="col-status">보관상태</th>
              <th className="col-author">작성자</th>
              <th className="col-date">게시일</th>
            </tr>
          </thead>
          <tbody>
            {renderTableBody()}
          </tbody>
        </table>

        <div className="pagination-list">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            &laquo;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={page === index ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages - 1}
          >
            &raquo;
          </button>
        </div>
      </div>
    </>
  );
}
