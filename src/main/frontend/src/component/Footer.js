import React from "react";
import "./Footer.css";
import bookLogo from "../assets/MainLogo.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="container_fix">
        <div className="footer_head">
          <span>개인정보처리방침</span>
          <div className="nav_auth_bar" />
          <span>이메일무단수집거부</span>
        </div>
      </div>
      <div className="footer_line"></div>
      <div className="container_fix">
        <div className="footer_body">
          <div className="footer_logo">
            <img alt="logo" src={bookLogo} />
          </div>
          <div>
            <p>
              ----
              <br />
              주소: 인천 남동구 인주대로 593 엔타스빌딩 12층
              <br />
              제작: 강원준, 김주영, 김태형, 신진희, 이선우, 한만서
            </p>
          </div>
        </div>
        <div className="footer_tail">
          <p>북적북적</p>
          <ul>
          <li><a href="http://instagram.com" target="_blank"><FaInstagram /></a></li>
          <li><a href="http://facebook.com" target="_blank"><FaFacebookSquare /></a></li>
          <li><a href="https://x.com/" target="_blank"><FaSquareTwitter /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
