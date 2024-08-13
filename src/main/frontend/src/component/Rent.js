import { useEffect, useState } from "react";
import "./Rent.css";
import axios from "axios";
import { getCurrentDateTime } from "../util/util";
import { IoMdHeartEmpty } from "react-icons/io";

function Rent() {
  const currentTime = getCurrentDateTime();

  const user1 = JSON.parse(localStorage.getItem("userInfo"));
  const book1 = JSON.parse(localStorage.getItem("book"));

  var rentSheet = {
    username: user1.name,
    bookname: book1.bookname,
    ISBN13: book1.ISBN13,
  };

  const [double, setDoublecheck] = useState();
  const [avilable, setAvilable] = useState();
  const [isStore, setIsStore] = useState(false);

  const rentOnclick = (e) => {
    e.preventDefault();
    rentSheet.date = currentTime;

    if (double == null) {
      axios.post("api/api/rent", { rentSheet })
        .then((response) => {
          console.log(response.data);
        });
      axios.put(`api/api/book/${book1.ISBN13}`, {
        avilable: "2",
        approval: "1",
      })
      .then((response) => {
        alert("대여가 신청되었습니다");
        window.location.reload();
      });
    } else if (double === '1') {
      alert("이미 신청 대기중인 건이 있습니다");
    } else if (double === '2') {
      alert("신청이 승인되어 대여준비중인 건이 있습니다");
    }
  };


  useEffect(() => {
    axios.get(`api/api/book/${book1.ISBN13}`).then((response) => {
      let data = response.data;
      setAvilable(data.length);
      if (avilable == 0) {
        setIsStore(true);
      }
    });

    const params = {
      username: user1.name,
      ISBN13: book1.ISBN13,
    };

    axios.get(`api/api/rentdouble/${book1.ISBN13}`, { params })
      .then((response) => {
        const result = response.data;
        setDoublecheck(result[0].result);
      });
  }, []);

  return (
    <div className="Rent">
      <div className="header">
        <h1>책 대여하기</h1>
      </div>
      <div className="bookInfo">
        <div className="book_img">
          <img src={book1.bookimgurl} alt="Book Cover" />
        </div>
        <div className="info_detail">
          <div className="book_name">
            <h2>{book1.bookname}</h2>
          </div>
          <div className="book_detail">
            <div className="author">
              <p> 저&nbsp;&nbsp;&nbsp;&nbsp;자 : </p>
              <p>{book1.author}</p>
            </div>
            <div className="publisher">
              <p> 출판사 : </p>
              <p>{book1.publisher}</p>
            </div>
            <div className="date">
              <p> 발행일 : </p>
              <p>{book1.date}</p>
            </div>
            <div className="ISBN13">
              <p> ISBN13 : </p>
              <p>{book1.ISBN13}</p>
            </div>
          </div>
          <div className="avilable">
            <p> 대출가능 권수 : {avilable}</p>
          </div>
          <div className="btn">
            <button className={`btn_rent ${isStore ? "store" : ""}`} disabled={isStore} onClick={rentOnclick}>
              대여하기
            </button>
            <button className="btn_wish">
              <IoMdHeartEmpty /> 위시리스트로
            </button>
          </div>
        </div>
      </div>
      <div className="book_Intro"></div>
    </div>
  );
}

export default Rent;
