import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css";
import TermsKeeping from "../../util/TermsKeeping";
import TermsKeeping1 from "../../util/TermsKeeping1";
import SubBanner from "../SubBanner";
import UserChatPage from "../realChat/UserChatPage";

export default function KeepingRegister() {
  const [formData, setFormData] = useState({
    bookName: "",
    isbn: "",
    rentable: "yes",
    note: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [userData, setUserData] = useState(null);
  const [highlightBookName, setHighlightBookName] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // const userId = JSON.parse(sessionStorage.getItem("userData")).userId;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isbn" && /^\d{0,13}$/.test(value)) {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    } else if (name !== "isbn") {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.isbn.length !== 13) {
      setIsValid(false);
      alert("ISBN 13자리를 모두 입력해주세요");
      return;
    }
    const requestData = {
      ...formData,
      userId: userData.userId,
      rentable: formData.rentable === "yes",
    };
    axios
      .post(`/api/keepings`, requestData)
      .then((response) => {
        console.log("Keeping request submitted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting keeping request:", error);
      });
  };

  const fetchBookData = async () => {
    if (formData.isbn) {
      try {
        const response = await axios.get(
          `/api/books/fetchBookData?isbn=${formData.isbn}`
        );
        if (response.data) {
          setFormData({
            ...formData,
            bookName: response.data.bookName,
          });
          setHighlightBookName(false);
          setErrorMessage("");
        } else {
          setErrorMessage(
            "ISBN에 맞는 책을 찾을수 없습니다. 수기로 작성 부탁드립니다"
          );
          setHighlightBookName(true);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        setErrorMessage("책 데이터를 불러오는 중 오류가 발생했습니다.");
        setHighlightBookName(true);
      }
    }
  };

  return (
    <>
      <UserChatPage />
      <SubBanner
        page_name={"storage"}
        title_en={"Book Storage"}
        title_kr={"책 보관하기"}
      />
      <div className="book-keeping-register-container">
        <form onSubmit={handleSubmit}>
          <div className="book-keeping-register-container-flex0">
            <span>도서 명</span>
            <input
              type="text"
              id="book-name"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              required
              className={highlightBookName ? "highlight" : ""}
              placeholder={highlightBookName ? "데이터가 없습니다. 수기로 작성부탁드려요" : "도서 명을 입력하세요"}
            />
          </div>
          <div className="book-keeping-register-container-flex1">
            <span>ISBN 넘버</span>
            <input
              type="text"
              pattern="\d*"
              title="13자리 숫자로 입력하세요"
              id="isbn-number"
              name="isbn"
              maxLength={13}
              placeholder="숫자 13자리 - 없이"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
            <button className="btn_write" type="button" onClick={fetchBookData}>
              정보 가져오기
            </button>
          </div>
          <div className="book-keeping-register-container-flex2">
            <span>대여가능 여부</span>
            <label>
              <input
                type="radio"
                name="rentable"
                value="yes"
                checked={formData.rentable === "yes"}
                onChange={handleChange}
              />
              대여를 허가합니다.
            </label>
            <label>
              <input
                type="radio"
                name="rentable"
                value="no"
                checked={formData.rentable === "no"}
                onChange={handleChange}
              />
              대여를 불허합니다.
            </label>
          </div>
          <div className="book-keeping-register-container-flex3">
            <span>비고</span>
            <textarea
              placeholder="이책은..."
              id="remarks"
              name="note"
              value={formData.note}
              onChange={handleChange}
            ></textarea>
          </div>
          <TermsKeeping1 />
          <div className="book-keeping-register-radio">
            <label>
              <input type="radio" name="privacy" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <TermsKeeping />
          <div className="book-keeping-register-radio">
            <label>
              <input type="radio" name="terms" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <div className="book-keeping-register-btn">
            <button onClick={() => navigate("/books")}>목록</button>
            <button type="submit">글쓰기</button>
          </div>
        </form>
      </div>
    </>
  );
}
