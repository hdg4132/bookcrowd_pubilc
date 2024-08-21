import React, { useEffect, useState } from "react";
import "./Rent_user.css";

const Rent_item = ({ rentId, bookname, isbn, userName, borrowedId, borrowedName, applicationDate, cause, approval }) => {

  const [currentState, setCurrentState] = useState("");
  const [currentClass, setCurrentClass] = useState("");

  useEffect(() => {
    if (approval === "1") {
      setCurrentState("대여 승인 대기중");
      setCurrentClass("pending");
    } else if (approval === "2") {
      setCurrentState("대여 중");
      setCurrentClass("borrowing");
    } else if (approval === "3") {
      setCurrentState("반려처리 됨");
      setCurrentClass("rejected");
    } else if (approval === "4") {
      setCurrentState("반납완료");
      setCurrentClass("returned");
    } else if (approval === "5") {
      setCurrentState("반납중 이상발생");
      setCurrentClass("error");
    }
  }, [approval]);

  return (
    <div className="rent_item">
      <div className="rent_item_line"/>
    <li className="rent_item_li">
      <div className="rent_item_wrap">
        <div className="rent_item_up">
          <div className="rentId">
            <p>신청번호: {rentId}</p>
          </div>
          <div className="rentBookname">
            <p>책 제목: {bookname}</p>
          </div>
          <div className="rentISBN">
            <p>ISBN: {isbn}</p>
          </div>
          <div className="rentDate">
            <p>신청일시: {applicationDate}</p>
          </div>
        </div>
        <div className="rent_item_down">
          <div className="rentUsername">
            <p>신청인: {borrowedName}</p>
          </div>
          <div className="rentUserID">
            <p>신청인 ID: {borrowedId}</p>
          </div>
          <div className={`rentCurrent ${currentClass}`}>
            <p>{currentState}</p>
            <p className={cause != null ? "cause" : "disable"}>반려 사유 : {cause}</p>
          </div>
        </div>
      </div>
    </li>
    <div className="rent_item_line"/>
    </div>
  );
};

export default Rent_item;
