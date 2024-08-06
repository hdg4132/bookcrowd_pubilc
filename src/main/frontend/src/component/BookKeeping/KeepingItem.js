import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css"
import SubBanner from "../SubBanner";

export default function KeepingItem() {
  const navigate = useNavigate();
  const { id: keepingId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(sessionStorage.getItem("keepingList"));
    if(storedItems) {
      setItems(storedItems);
      // console.log(storedItems)
    } else {
      console.error("No keeping list found in session storage");
      navigate("/login");
      return;
    }

    axios
    .get(`/api/keepings/detail/${keepingId}`)
    .then((response) => {
      setItem(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
    })
  }, [keepingId, navigate]);

  const handleReturnRequest = () => {
    axios
      .put(`/api/keepings/requestReturn/${keepingId}`)
      .then((response) => {
        console.log("Return request submitted successfully");
        navigate("/books");
      })
      .catch((error) => {
        console.error("Error submitting return request:", error);
        alert("해당 책을 보유하고 있지 않습니다");
      });
  };

  const handlePrev = () => {
    const currentIndex = items.findIndex((item) => item.keepingId === Number(keepingId));
    console.log(`Next Item ID: ${items[currentIndex + 1]?.keepingId}`); // 다음 아이템의 ID 로그 출력
    if (currentIndex < items.length - 1) {
      navigate(`/book/${items[currentIndex + 1].keepingId}`);
    } else {
      alert("최신 키핑한 책 페이지입니다.");
    }
  };

  const handleNext = () => {
    const currentIndex = items.findIndex((item) => item.keepingId === Number(keepingId));
    if (currentIndex > 0) {
      navigate(`/book/${items[currentIndex - 1].keepingId}`);
    } else {
      alert("처음 키핑한 책 페이지입니다.");
    }
  };



  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  if (!item) return <p>No data found</p>;

  return (
    <>
    <SubBanner page_name={"storage"} title_en={"Book Storage"} title_kr={"책 보관하기"} search />
      <div class="book-keeping-item-container">
        <table>
          <tbody>
            <tr>
              <td class="col1">도서명</td>
              <td class="col2">{item.bookName}</td>
            </tr>
            <tr>
              <td class="col1">ISBN 넘버</td>
              <td class="col2">{item.isbn}</td>
            </tr>
            <tr>
              <td class="col1">대여가능 여부</td>
              <td class="col2">{item.rentable ? "가능" : "불가능"}</td>
            </tr>
            <tr>
              <td class="col1">비고</td>
              <td class="col2">{item.note}</td>
            </tr>
            <tr>
              <td class="col1">개인정보 활용동의</td>
              <td class="col2">동의</td>
            </tr>
            <tr>
              <td class="col1">이용약관 동의</td>
              <td class="col2">동의</td>
            </tr>
          </tbody>
        </table>
        <div class="button-container">
          {item.keepStatus === 4 ? (
            <button disabled>반환완료</button>
          ) : item.keepStatus === 3 ? (
            <button onClick={handleReturnRequest} disabled>반환신청완료</button>
          ) : (
            <button onClick={handleReturnRequest}>반환신청하기</button>
          )}
        </div>
        <div class="pagination-item">
          <span onClick={handlePrev}>&lt; Prev</span>
          <span onClick={() => navigate("/books")}>&#9776; List</span>
          <span onClick={handleNext}>Next &gt;</span>
        </div>
      </div>
    </>
  );
}