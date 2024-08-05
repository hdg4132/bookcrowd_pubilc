import axios from "axios";
import { useEffect, useState } from "react";

const Rent_item = ({ id, date, bookname, ISBN13, username }) => {
  
  const approval = (e) => {
    e.preventDefault();
    const approval = window.confirm("승인하시겠습니까?")
    if (approval == true){
    axios
      .put(`api/api/rent_admin/${id}`, {
        rentId: id,
        approval: "2",
      })
      .then(() => window.location.reload());}
  };

  const cancel = (e) => {
    e.preventDefault();
    const approval = window.confirm("반려하시겠습니까?")
    if (approval == true){
    const cause = window.prompt("사유를 적어주세요")
    axios
      .put(`api/api/rent_admin/${id}`, {
        rentId: id,
        ISBN13: ISBN13,
        approval: "3",
        cause: cause
      })
      .then(() => window.location.reload());
    }
  };

  const [avilable, setAvilable] = useState();

  useEffect(() => {
    axios.get(`api/api/book/${ISBN13}`).then((response) => {
      console.log(response.data);
      let data = response.data;
      setAvilable(data.length);
    });
  }, []);


  return (
    <li className="rent_item_li">
      <div className="rentId">
        <p> 신청번호 : {id}</p>
      </div>
      <div className="rentBookname">
        <p> 책 제목 : {bookname}</p>
      </div>
      <div className="rentDate">
        <p> 신청일시 : {date}</p>
      </div>
      <div className="rentUsername">
        <p> 신청인 : {username}</p>
      </div>
      <div className="rentISBN">
        <p> ISBN : {ISBN13}</p>
      </div>
      <div className="rentStore">
        <p> 재고수량 : {avilable}</p>
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
