import axios from "axios";
import { useState } from "react";

const Rent_item_cancel = ({
  rentId,
  cause,
  bookname,
  isbn,
  username,
  borrowedId,
  borrowedName,
  applicationDate,
}) => {
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
        </div>
      </div>
      <div className="rentButton">
        <div className="rentCause">
          <p> 반려사유 : {cause}</p>
        </div>
      </div>
    </li>
  );
};

export default Rent_item_cancel;
