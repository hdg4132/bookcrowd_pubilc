import { useNavigate } from "react-router-dom";


const Rent_item = ({ rentId, date, bookname, isbn, username, borrowedId, borrowedName, applicationDate}) => {

  const nav = useNavigate();

  const approval = (e) => {
    e.preventDefault();
    const approval = window.confirm("승인하시겠습니까?");
    if (approval == true) {
      const user = {
        rentId: rentId,
        isbn: isbn,
      }
      nav("/bookmatch", {state: user});
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    const approval = window.confirm("반려하시겠습니까?");
    if (approval == true) {
      const cause = window.prompt("사유를 적어주세요");
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
          <p> 대출권수 : {username}</p>
        </div>
      </div>
      </div>
      <div className="rentButton">
        <div className="approval">
          <button onClick={approval}> 승인! </button>
        </div>
        <div className="cancel">
          <button onClick={cancel}> 반려.. </button>
        </div>
      </div>
    </li>
  );
};

export default Rent_item;
