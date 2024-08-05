import axios from "axios";
import { useState } from "react";

const Rent_item_cancel = ({ id, date, bookname, ISBN13, username }) => {
  
        const [isDropdownView, setDropdownView] = useState(false)
      
        const handleClickContainer = () => {
          setDropdownView(!isDropdownView)
        }
      
        const handleBlurContainer = () => {
          setTimeout(() => {
            setDropdownView(false)
          }, 200);
        }


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
      <div className="container" onBlur={handleBlurContainer}>
            <label onClick={handleClickContainer}>
              <button>Dropdown Menu{isDropdownView ? '▲' : '▼'}</button>
            </label>
            {isDropdownView && <Dropdown /> }
          </div>
    </li>
  );
};

export default Rent_item_cancel;
