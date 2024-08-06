import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";
import getCurrentDateTime from "../../util/util";
import SubBanner from "../SubBanner";

export default function KeepingList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/login")
    }
  }, [navigate])

  // const userId = JSON.parse(sessionStorage.getItem("userData")).userId;



  useEffect(() => {
    if (userData) {
    fetchAllKeepings()
      .then(() => fetchData(page))
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    }
  }, [page, userData]);

  const fetchData = (page) => {
    setLoading(true);
    axios
      .get(`/api/keepings/${userData.userId}?page=${page}&size=10`)
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const fetchAllKeepings = () => {
    return axios
      .get(`/api/keepings/all/${userData.userId}`)
      .then((response) => {
        sessionStorage.setItem("keepingList", JSON.stringify(response.data));
        console.log(
          "Saved to sessionStorage:"
        );
      })
      .catch((error) => {
        console.error("Error fetching all keepings:", error);
        throw error; // 이 부분을 추가하여 프로미스를 반환합니다.
      });
  };

  const handleRowClick = (keepingId) => {
    navigate(`/book/${keepingId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
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

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <SubBanner
        page_name={"storage"}
        title_en={"Book Storage"}
        title_kr={"책 보관하기"}
        search
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
            {data.length === 0 ? (
              <tr>
                <td colSpan="4">
                  데이터가 없습니다.
                  <button onClick={handleRegisterClick}>등록하기</button>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.keepingId}
                  onClick={() => handleRowClick(item.keepingId)}
                >
                  <td className="col-title">{item.bookName}</td>
                  <td className="col-status">
                    {keepStatusMap[item.keepStatus]}
                  </td>
                  <td className="col-author">{userData.name}</td>
                  <td className="col-date"><getCurrentDateTime />{item.keepDate}</td>
                </tr>
              ))
            )}
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
              disabled={page === totalPages -1}
            >
              &raquo;
            </button>
          </div>
        
        </div>
    </>
  );
}
