import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SubBanner from "../../component/SubBanner";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./CommunityEdit.css";

const CommunityEditChange = () => {
  const { id } = useParams(); // 게시글 ID를 URL에서 가져옴
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (!userInfo) {
      navigate("/login"); // 로그인하지 않은 경우 로그인 페이지로 리디렉션
      return;
    }
    setIsLoggedIn(true);

    // 게시글 데이터 가져오기
    axios
      .get(`http://localhost:8080/api/community/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setLoading(false); // 데이터 로딩 완료
      })
      .catch((error) => {
        console.error("게시글을 불러오는 데 실패했습니다:", error);
        setLoading(false); // 데이터 로딩 완료
      });
  }, [id, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      title,
      content,
      date: new Date().toISOString(), // 현재 날짜를 새로 설정
      writer: JSON.parse(sessionStorage.getItem("userData")).username, // 로그인 사용자명
    };

    axios
      .put(`http://localhost:8080/api/community/${id}`, updatedPost) // PUT 요청으로 수정
      .then((response) => {
        navigate(`/community/${id}`); // 수정 후 게시글 상세 페이지로 이동
      })
      .catch((error) => {
        console.error("게시글 수정에 실패했습니다:", error);
      });
  };

  // 로그인 상태가 확인되기 전에는 로딩 상태를 표시
  if (loading) {
    return <div>Loading...</div>;
  }

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
                수정 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityEditChange;
