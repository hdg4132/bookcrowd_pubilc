import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCurrentDateTime } from "../../util/util";

const RentBookItem = ({ keepingId, userId, bookId, bookName, rentable, note, keepDate, isbn, rent, count}) => {
  
    const nav = useNavigate();
    const date = getCurrentDateTime();

    const approval = (e) => {
      const instance = axios.create({
        baseURL: "http://localhost:8080",
        timeout: 10000,
      });
      
        e.preventDefault();
        const approval = window.confirm("승인하시겠습니까?");
        if (approval == true) {
          instance.put("/keepings/matching", {
                keepingId: keepingId,
                keepStatus: 2
            })

            instance.put("/rents/matching", {
                rentId: rent.rentId,
                keepingId: keepingId,
                approval: '2',
                borrowDate: date,
                bookId: bookId
            })
            .then(
                alert("매칭이 완료되었습니다"),
                nav("/adm/rent_admin")
            )
            .catch((error) => console.error("Error fetching posts:", error))
    }
    }
  
    return (
      <li className="rent_item_li">
        <div className="rent_item_wrap">
        <div className="rent_item_keeping">
          <div className="keepingId">
            <p> 보관번호 : {keepingId}</p>
          </div>
          <div className="keepingUser">
            <p> 보관인 id : {userId}</p>
          </div>
          <div className="keepingISBN">
            <p> ISBN : {isbn}</p>
          </div>
          <div className="keepingBookname">
            <p> 도서명: {bookName}</p>
          </div>
          <div className="keepingDate">
            <p> 보관시작일 : {getCurrentDateTime(keepDate)}</p>
          </div>
          <div className="rentLimit">
            <p> 대여회수 : {count}</p>
          </div>
        </div>     
        </div>
        <div className="rentButton">
          <div className="matching">
            <button onClick={approval}> 매칭! </button>
          </div>
        </div>
      </li>
    );
  };
  
  export default RentBookItem;
  