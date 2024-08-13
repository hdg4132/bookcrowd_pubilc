import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SubBanner from "../../component/SubBanner";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./CommunityEdit.css";

const CommunityEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userId, setUserId] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 및 사용자 이메일 확인
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (!userInfo) {
      // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      navigate("/login");
    } else {
      setIsLoggedIn(true);
      setUserId(userInfo.name); // 사용자 이메일 설정
    }
  }, [navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newPost = {
      title,
      content,
      date: new Date().toISOString(),
      writer: userId, // 로그인한 사용자 이메일을 작성자로 설정
    };

    axios
      .post("http://localhost:8080/api/community", newPost) // 서버 URL 확인
      .then(() => {
        navigate("/community");
      })
      .catch((error) => {
        console.error("게시글 작성에 실패했습니다:", error);
      });
  };

  if (!isLoggedIn) return null;

  return (
    <div>
      <SubBanner
        page_name={"community"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
      />
      <div className="edit_section">
        <div className="container_fix">
          <form onSubmit={handleSubmit} className="edit_form">
            <div className="form_group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                className="title_box"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력하세요"
                required
              />
            </div>
            <div className="form_group">
              <h3 className="form_group_h3">내용</h3>
              <ReactQuill
                id="content"
                className="content_box"
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요"
                required
              />
            </div>
            <div className="form_buttons">
              <Link to="/community" className="edit_btn_list">
                목록
              </Link>
              <button type="submit" className="edit_btn_write">
                글쓰기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityEdit;
