import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "./Rent_admin.css";
import axios from "axios";
import Rent_item from "./Rent_item";

const Rent_admin = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const instance = axios.create({
      baseURL: "api",
      timeout: 10000,
    });
    instance
      .get("/rents/approval/1")
      // rent뒤의 1은 승인상태 1은 미승인, 2는 승인, 3은 반려처리 4는 비고사항이 있는 서적
      //현재 페이지는 미승인 페이지 재고 = 전체재고 - 승인재고
      .then((data) => {
        setPosts(data.data);
        console.log(posts)
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  console.log(posts)
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
          <h3 className="rent_admin_tt">대여 신청상황</h3>
        </div>
        <div className="rent_admin_body">
          <ul className="rent_item">
            {posts && posts.map((it) => <Rent_item key={it.id} {...it} />)}
          </ul>
        </div>
        <div className="rent_admin_tail">
          <div className="btn_list"></div>
        </div>
      </div>
    </div>
  );
};

export default Rent_admin;
