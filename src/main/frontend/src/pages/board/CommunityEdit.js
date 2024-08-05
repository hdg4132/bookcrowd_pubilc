import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubBanner from "../../component/SubBanner";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./CommunityEdit.css";

const CommunityEdit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString(),
      author: "작성자명",
    };
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    navigate("/community");
  };

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
