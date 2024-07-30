import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "./Rent_admin.css";
import axios from "axios";
import Rent_item_cancel from "./Rent_item_cancel.js";

const Rent_admin_canceled = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const instance = axios.create({
      baseURL: "api/api",
      timeout: 10000,
    });
    instance
      .get("/rent/3")
      // rent뒤의 1은 승인상태 1은 미승인, 2는 승인, 3은 반려처리
      .then((data) => {
        setPosts(data.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="Rent_Admin_List">
      <div className="Admin_side">
        <div className="Admin_LOGO"> 사이트 로고 </div>
        <div>
          <div>
            <a href="">회원관리</a>
          </div>
          <div>
            <Link to="/rent_admin">
              대여목록으로 <Outlet />
            </Link>
            
          </div>
          <div>
          <Link to="/rent_admin_return">
              반납등록으로 <Outlet />
            </Link>
          </div>
        </div>
      </div>

      <div className="rent_admin_wrap">
        <div className="rent_admin_header">
          <h3 className="rent_admin_tt">반려처리목록</h3>
        </div>
        <div className="rent_admin_body">
          <ul className="rent_item">
            {posts && posts.map((it) => <Rent_item_cancel key={it.id} {...it} />)}
          </ul>
        </div>
        <div className="rent_admin_tail">
          <div className="btn_list"></div>
        </div>
      </div>
    </div>
  );
};

export default Rent_admin_canceled;
