import { useContext, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./Rent_admin.css";
import axios from "axios";
import RentBookItem from "./RentBookItem";
import { getCurrentDateTime } from "../../util/util";

const RentBookmatch = () => {
  const location = useLocation();
  const nav = useNavigate();

  if (location == null) {
    nav("/")
    alert("잘못된 접근입니다")
  }

  const state = location.state;
  const [data, setData] = useState({});
  const [rent, setRent] =useState();
  const [keeping, setKeeping] =useState();
  const date = getCurrentDateTime();

  useEffect(() => {
    axios
      .get(`api/rents/rentapproval/${state.rentId}/${state.isbn}`)
      .then((data) => {
        setData(data.data);
        console.log(data.data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    setRent(data.rentDTO)
    setKeeping(data.keepingDTO)
  }, [data]);
  

  return (
    <div className="Rent_Admin_List">
      <div className="Admin_side">
        <div className="Admin_LOGO"> 사이트 로고 </div>
        <div className="Admin_side_link">
          <div>
            <a href="">회원관리</a>
          </div>
          <div>
            <Link to="/rent_admin_canceled">
              반려목록으로 <Outlet />
            </Link>
          </div>
          <div>
            <Link to="/rent_admin_return">
              반납등록으로 <Outlet />
            </Link>
          </div>
          <div>
          <Link to="/">
              메인으로 <Outlet />
            </Link>
          </div>
        </div>
      </div>

      <div className="rent_admin_wrap">
        <div className="rent_admin_header">
          <h3 className="rent_admin_tt">대여 서적목록</h3>
        </div>
        <div className="rent_admin_body">
          <h3> 대여 받는분</h3>
          <div className="rentBookmatch">
            <div className="rentId">
              <p> 신청번호 : {rent && rent[0].rentId}</p>
            </div>
            <div className="rentBookname">
              <p> 책 제목 : {rent && rent[0].bookname}</p>
            </div>
            <div className="rentISBN">
              <p> ISBN : {rent && rent[0].isbn}</p>
            </div>
            <div className="rentDate">
              <p> 신청일시 : {rent && rent[0].applicationDate}</p>
            </div>
            <div className="rentUsername">
              <p> 신청인 : {rent && rent[0].borrowedName}</p>
            </div>
            <div className="rentUserID">
              <p> 신청인id : {rent && rent[0].borrowedId}</p>
            </div>
          </div>

        <h3> 보관중인 책 목록</h3>
          <ul className="rent_item">
            {keeping && rent && keeping.map((it) => <RentBookItem key={it.keepingId} {...it} rent={rent[0]}/>)}
          </ul>
        </div>
        <div className="rent_admin_tail">
          <div className="btn_list"></div>
        </div>
      </div>
    </div>
  );
};

export default RentBookmatch;
