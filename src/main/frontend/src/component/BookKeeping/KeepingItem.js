import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css"

export default function KeepingItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/keepings/detail/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleReturnRequest = () => {
    axios
      .put(`/api/keepings/requestReturn/${id}`)
      .then((response) => {
        console.log("Return request submitted successfully");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error submitting return request:", error);
        alert("해당 책을 보유하고 있지 않습니다");
      });
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  if (!item) return <p>No data found</p>;

  return (
    <>
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
          ) : (
            <button onClick={handleReturnRequest}>반환신청하기</button>
          )}
        </div>
        <div class="pagination-item">
          <span>&lt; Prev</span>
          <span onClick={() => navigate("/books")}>&#9776; List</span>
          <span>Next &gt;</span>
        </div>
      </div>
    </>
  );
}