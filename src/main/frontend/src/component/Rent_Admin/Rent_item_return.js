import axios from "axios";
import { useEffect, useState } from "react";
import { getCurrentDateTime } from "../../util/util";

const Rent_item_return = ({applicationDate, bookname, borrowDate, borrowedId, borrowedName, isbn, keepingId, rentId}) => {
  
  const date = getCurrentDateTime();

  const bookReturn = (e) => {
    e.preventDefault();
    const approval = window.confirm("반납완료 처리하시겠습니까?");
    if (approval == true) {
      axios.put(`/bookreturn`, {
          rentId: rentId,
          approval: "3",
          returnDate: date,
        })
       axios.put(`api/keepings/bookreturn`, {
        keepingId: keepingId,
        keepingStatus: 1,
        lastBorrowed: date,
       }) 
        .then(() => window.location.reload());
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    const approval = window.confirm("특이사항이 있습니까?");
    if (approval == true) {
      const significant = window.prompt("내용을 적어주세요");

      axios.put(`/bookreturn`, {
        rentId: rentId,
        approval: "4",
        returnDate: date,
        description: significant,
      })
     axios.put(`api/keepings/bookreturn`, {
      keepingId: keepingId,
      keepingStatus: 0,
      lastBorrowed: date,
      note: significant,
     })
        .then(() => window.location.reload());
    }
  };

  return (
    <li className="rent_item_li">
      <div className="rent_item_wrap">
      <div className="rent_item_up">
        <div className="rentId">
          <p> 신청번호 : {rentId}</p>
        </div>
        <div className="rentBookname">
          <p> 책 제목 : {bookname}</p>
        </div>
        <div className="rentISBN">
          <p> ISBN : {isbn}</p>
        </div>
        <div className="rentDate">
          <p> 신청일시 : {applicationDate}</p>
        </div>
      </div>
      <div className="rent_item_down">
        <div className="rentUsername">
          <p> 신청인 : {borrowedName}</p>
        </div>
        <div className="rentUserID">
          <p> 신청인id : {borrowedId}</p>
        </div>
        <div className="rentCurrent">
          <p> 대출일자 : {borrowDate}</p>
        </div>
      </div>
      </div>
      <div className="rentButton">
        <div className="approval">
          <button onClick={bookReturn}> 반납완료 </button>
        </div>
        <div className="cancel">
          <button onClick={cancel}> 비고적용필요 </button>
        </div>
      </div>
    </li>
  );
};

export default Rent_item_return;
