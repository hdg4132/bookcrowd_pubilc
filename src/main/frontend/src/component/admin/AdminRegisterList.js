import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/style.css";
import AdmLayout from "../AdmLayout";
import {useNavigate} from "react-router-dom";
import ListSearch from "../ListSearch";

export default function AdminRegisterList() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  // console.log(userData)
  if (!userData || userData.userType != 2){
    alert("관리자 계정이 필요한 페이지입니다, 관리자 계정으로 접속해 주세요")
    nav("/login")
  }

  useEffect(() => {
    fetchKeepings(currentStatus, page, searchKeyword);
  }, [currentStatus, page, searchKeyword]);

  const fetchKeepings = (status, page, keyword = "") => {
    setLoading(true);

    let url = `/api/keepings/admin?page=${page}&size=10`;

    if (status !== "all") {
      url = `/api/keepings/status/${status}?page=${page}&size=10`;
    }

    if (keyword) {
      url = `/api/keepings/search?keyword=${keyword}&page=${page}&size=10`
    }
    axios
      .get(url)
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

  const handleApproveKeeping = (ISBN, bookName) => {
    axios.put(`/api/keepings/updateStatus/${ISBN}`, null, {
        params: {
            bookName: bookName
        }
    })
    .then((response) => {
        fetchKeepings(currentStatus, page);
        console.log("KeepStatus updated")
    })
    .catch((error) => {
        alert("Error occurred while approving keeping");
        console.error("Error approving keeping:", error);
    });
};


  const handleApproveReturn = (keepingId) => {
    axios
      .put(`/api/keepings/approveReturn/${keepingId}`)
      .then((response) => {
        console.log("Return approved successfully");
        // 현재 페이지의 데이터를 다시 불러와 업데이트
        fetchKeepings(currentStatus, page);
      })
      .catch((error) => {
        console.error("Error approving return:", error);
      });
  };

  const handleStatusButtonClick = (e) => {
    setCurrentStatus(e.target.value);
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      fetchKeepings(currentStatus, newPage, searchKeyword);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(0);
  }

  const keepStatusMap = {
    0: "승인 대기",
    1: "보관 중",
    2: "대여 중",
    3: "반환 신청",
    4: "반환 완료",
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <AdmLayout />
      <div className="book-keeping-admin-container adm_con">
        <ListSearch onSearch={handleSearch} searchKeyword={searchKeyword}/>
        <section className="member-management">
          <div className="member-flex">
            <h1>회원관리</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th className="col1">회원 아이디</th>
                <th className="col2">도서명</th>
                <th className="col3">ISBN</th>
                <th className="col4">대여가능여부</th>
                <th className="col5">비고</th>
                <th className="col6">
                  <select
                    value={currentStatus}
                    onChange={handleStatusButtonClick}
                  >
                    <option value="all">전체 보기</option>
                    <option value="0">승인 대기</option>
                    <option value="1">보관 중</option>
                    <option value="2">대여 중</option>
                    <option value="3">반환 신청</option>
                    <option value="4">반환 완료</option>
                  </select>
                </th>
                <th className="col7">대여 게시글쓰기</th>
                <th className="col8">상태</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8">데이터가 없습니다.</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.keepingId}>
                    <td className="col1 table-cell">{item.userId}</td>
                    <td className="col2">{item.bookName}</td>
                    <td className="col3">{item.isbn}</td>
                    <td className="col4">
                      {item.rentable ? "가능" : "불가능"}
                    </td>
                    <td className="col5 table-cell">{item.note}</td>
                    <td className="col6">{keepStatusMap[item.keepStatus]}</td>
                    <td className="col7">
                      { item.keepStatus === 0 ?
                      ( <button className="book-keeping-admin-btn1" onClick={()=>nav('/adm/rent/write', {state: {...item}})}>
                        책정보입력
                        </button>):''
                      }
                    </td>
                    <td className="col8">
                      {item.keepStatus === 0 ? (
                        <button
                          className="book-keeping-admin-btn2"
                          onClick={() => handleApproveKeeping(item.isbn, item.bookName)}
                        >
                          보관 승인
                        </button>
                      ) : item.keepStatus === 1 ? (
                        <button className="book-keeping-admin-btn2" style={{backgroundColor: '#FE7070'}} disabled>
                          책 보관중
                        </button>
                      ) : item.keepStatus === 2 ? (
                        <button className="book-keeping-admin-btn2" style={{backgroundColor: '#FF24BD'}} disabled>
                          대여중
                        </button>
                      ): item.keepStatus === 3 ? (
                        <button
                          className="book-keeping-admin-btn2"
                          style={{backgroundColor: '#14ae5c'}}
                          onClick={() => handleApproveReturn(item.keepingId)}
                        >
                          반환 승인
                        </button>
                      ) : item.keepStatus === 4 ? (
                        <button className="book-keeping-admin-btn2" style={{backgroundColor: '#FFB800'}} disabled>
                          반환 완료
                        </button>
                      ) : null}
                    </td>
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
                disabled={page === index}
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
        </section>
      </div>
    </>
  );
}
