import React, { useEffect } from "react";
import "./Header.css";
import bookLogo from "../assets/MainLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
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

  return (
    <header id="header">
      <div className="container_fix">
        <div className="logo">
          <Link to="/home">
            <img alt="logo" src={bookLogo} />
          </Link>
        </div>
        <nav id="navbar_1">
          <ul className="nav_menu">
            <li>
              <Link to="#" className="nav_menu_line">
                책 보관하기
              </Link>
            </li>
            <li>
              <Link to="#" className="nav_menu_line">
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
            <Link to="#" className="nav_auth_line">
              <span>로그인</span>
            </Link>
            <div className="nav_auth_bar" />
            <Link to="#" className="nav_auth_line">
              <span>회원가입</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
