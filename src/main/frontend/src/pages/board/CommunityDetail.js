import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SubBanner from "../../component/SubBanner";
import "./CommunityDetail.css";

const formatDate = (date) => {
  if (!date) return "날짜 없음";
  const postDate = new Date(date);
  const now = new Date();
  const diff = Math.abs(now - postDate);
  const diffMinutes = Math.floor(diff / 60000);

  if (diffMinutes < 1) return "방금 전";
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  return `${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}`;
};

export default function CommunityDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const loggedInUser = "사용자명";
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = posts.find((item) => item.id === parseInt(id));
    setPost(foundPost);

    const savedComments =
      JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditCommentText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      const newComments = [
        ...comments,
        { id: Date.now(), author: loggedInUser, comment },
      ];
      setComments(newComments);
      setComment("");

      localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
    }
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((c) => c.id === commentId);
    setEditCommentId(commentId);
    setEditCommentText(commentToEdit.comment);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    if (editCommentText.trim()) {
      const updatedComments = comments.map((c) =>
        c.id === editCommentId ? { ...c, comment: editCommentText } : c
      );
      setComments(updatedComments);
      setEditCommentId(null);
      setEditCommentText("");

      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    }
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);

    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
  };

  const handlePostDelete = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((item) => item.id !== parseInt(id));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    localStorage.removeItem(`comments_${id}`);

    navigate("/community");
  };

  return (
    <div>
      <SubBanner
        page_name={"community"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
      />
      <div>
        <div className="container_fix">
          <div className="detail_title">
            <h5>{post?.title || "게시글이 존재하지 않습니다."}</h5>
          </div>
          <div className="detail_content">
            <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
          </div>
        </div>
      </div>
      <div className="comment_section">
        <div className="container_fix">
          <div className="comment_title">
            <p>댓글</p>
          </div>
          <ul className="comment_list">
            {comments.length > 0 ? (
              comments.map((c) => (
                <li key={c.id} className="comment_item">
                  <div>
                    <p className="comment_writer">{c.author}</p>
                    <div className="comment_content">{c.comment}</div>
                  </div>
                  <div className="comment_actions">
                    {loggedInUser === c.author && (
                      <>
                        <button onClick={() => handleEdit(c.id)}>수정</button>
                        <div className="nav_auth_bar" />
                        <button onClick={() => handleDelete(c.id)}>삭제</button>
                      </>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="comment_item">
                <div>댓글이 없습니다.</div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="container_fix">
        {editCommentId ? (
          <div className="comment_form_section">
            <form className="comment_form" onSubmit={handleSaveEdit}>
              <textarea
                className="comment_textarea"
                value={editCommentText}
                onChange={handleEditChange}
                placeholder="댓글을 수정하세요"
              ></textarea>
              <button className="submit_button" type="submit">
                저장
              </button>
              <button
                className="cancel_button"
                onClick={() => setEditCommentId(null)}
              >
                취소
              </button>
            </form>
          </div>
        ) : (
          <div className="comment_form_section">
            <form className="comment_form" onSubmit={handleSubmit}>
              <textarea
                className="comment_textarea"
                value={comment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요"
              ></textarea>
              <button className="submit_button" type="submit">
                글쓰기
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="container_fix">
        <div className="button_container">
          <Link to="/community" className="list_button">
            목록
          </Link>
          <Link to={`/communityEdit`} className="write_button">
            글쓰기
          </Link>
          <button onClick={handlePostDelete} className="delete_button">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
