import React, { useEffect } from "react";
import "./Header.css";
import bookLogo from "../assets/MainLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    const topscroll = function () {
      const navbar = document.getElementById("header");
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        navbar.classList.add("topbar");
      } else {
        navbar.classList.remove("topbar");
      }
    };
    window.addEventListener("scroll", topscroll);
    return () => {
      window.removeEventListener("scroll", topscroll);
    };
  });

  const location = useLocation();
  const isHeaderHidden = location.pathname.includes("/adm/");

  if (isHeaderHidden) {
    return null;
  }

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출 (백엔드에 로그아웃 처리를 추가해야 합니다)
      await axios.post("http://localhost:8080/api/auth/logout");
      // 세션에서 사용자 정보 제거
      sessionStorage.removeItem("userData");
      alert("로그아웃 완료되엇습니다.");
      // 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <header id="header">
      <div className="container_fix">
        <div>
          <Link to="/">
            <img alt="logo" src={bookLogo} />
          </Link>
        </div>
        <nav id="navbar_1">
          <ul className="nav_menu">
            <li>
              <Link to="/books" className="nav_menu_line">
                책 보관하기
              </Link>
            </li>
            <li>
              <Link to="/rent" className="nav_menu_line">
                책 대여하기
              </Link>
            </li>
            <li>
              <Link to="/community" className="nav_menu_line">
                커뮤니티
              </Link>
            </li>
          </ul>
        </nav>
        <nav id="navbar_2">
          <div className="nav_auth">
            {userInfo ? (
              <>
                <span className="nav_auth_line" onClick={handleLogout} style={{cursor: 'pointer'}}>
                  로그아웃
                </span>
                <div className="nav_auth_bar" />
                <Link to="/mypage/:page" className="nav_auth_line">
                  마이페이지
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav_auth_line">
                  로그인
                </Link>
                <div className="nav_auth_bar" />
                <Link to="/signup" className="nav_auth_line">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
