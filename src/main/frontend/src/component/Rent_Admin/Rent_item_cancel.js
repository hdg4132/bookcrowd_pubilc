import axios from "axios";
import { useState } from "react";

const Rent_item_cancel = ({ id, date, bookname, ISBN13, username, cause }) => {
  
  return (
    <li className="rent_item_li">
    <div className="rent_item_wrap">
    <div className="rent_item_up">
      <div className="rentId">
        <p> 신청번호 : {id}</p>
      </div>
      <div className="rentBookname">
        <p> 책 제목 : {bookname}</p>
      </div>
      <div className="rentISBN">
        <p> ISBN : {ISBN13}</p>
      </div>
      <div className="rentDate">
        <p> 신청일시 : {date}</p>
      </div>
      <div className="rentStore">
        <p> 반려사유 : {cause}</p>
      </div>
    </div>
    <div className="rent_item_down">
      <div className="rentUsername">
        <p> 신청인 : {username}</p>
      </div>
      <div className="rentUserID">
        <p> 신청인id : {username}</p>
      </div>
      <div className="rentCurrent">
        <p> 대출권수 : {username}</p>
      </div>
      <div className="rentLimit">
        <p> 대출한도 : {username}</p>
      </div>
    </div>
    </div>
  </li>
  );
};

export default Rent_item_cancel;
