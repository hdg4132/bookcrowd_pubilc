import React from "react";
import "./Rent_user.css";

const Rent_item = ({ rentId, bookName, isbn, userName, borrowedId, borrowedName, applicationDate }) => {
  return (
    <li className="rent_item_li">
      <div className="rent_item_wrap">
        <div className="rent_item_up">
          <div className="rentId">
            <p>신청번호: {rentId}</p>
          </div>
          <div className="rentBookname">
            <p>책 제목: {bookName}</p>
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
          <div className="rentCurrent">
            <p>대출권수: {userName}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Rent_item;
