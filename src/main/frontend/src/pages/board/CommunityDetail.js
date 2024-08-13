import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import SubBanner from "../../component/SubBanner";
import "./CommunityDetail.css";

export default function CommunityDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postWriter, setPostWriter] = useState(""); // 게시글 작성자
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/community/${id}`)
      .then((response) => {
        setPost(response.data);
        setPostWriter(response.data.writer); // 게시글 작성자 설정
      })
      .catch((error) => {
        console.error(
          "게시글을 가져오는 데 실패했습니다:",
          error.response ? error.response.data : error.message
        );
      });

    axios
      .get(`http://localhost:8080/api/community/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(
          "댓글을 가져오는 데 실패했습니다:",
          error.response ? error.response.data : error.message
        );
      });
  }, [id]);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    setIsLoggedIn(!!userInfo); // 로그인 정보가 있으면 true, 없으면 false
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (comment.trim()) {
      axios
        .post(`http://localhost:8080/api/community/${id}/comments`, {
          writer: userInfo.name,
          comment,
        })
        .then((response) => {
          setComments([...comments, response.data]);
          setComment("");
        })
        .catch((error) => {
          console.error(
            "댓글 추가에 실패했습니다:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (editCommentText.trim()) {
      axios
        .put(
          `http://localhost:8080/api/community/${id}/comments/${editCommentId}`,
          {
            writer: userInfo.name,
            comment: editCommentText,
          }
        )
        .then((response) => {
          const updatedComments = comments.map((c) =>
            c.id === editCommentId ? response.data : c
          );
          setComments(updatedComments);
          setEditCommentId(null);
          setEditCommentText("");
        })
        .catch((error) => {
          console.error(
            "댓글 수정에 실패했습니다:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`http://localhost:8080/api/community/${id}/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error(
          "댓글 삭제에 실패했습니다:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handlePostDelete = () => {
    axios
      .delete(`http://localhost:8080/api/community/${id}`)
      .then(() => {
        navigate("/community");
      })
      .catch((error) => {
        console.error(
          "게시글 삭제에 실패했습니다:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleEdit = (commentId) => {
    setEditCommentId(commentId);
    const commentToEdit = comments.find((c) => c.id === commentId);
    if (commentToEdit) {
      setEditCommentText(commentToEdit.comment);
    }
  };

  if (!post) return <div>Loading...</div>;

  const userInfo = JSON.parse(sessionStorage.getItem("userData")) || {};
  const loggedInUser = userInfo.name;

  return (
    <div>
      <SubBanner
        page_name={"community"}
        title_en={"Community"}
        title_kr={"커뮤니티"}
      />
      <div className="container_fix">
        <div className="detail_title">
          <h5>{post?.title || "게시글이 존재하지 않습니다."}</h5>
        </div>
        <div className="detail_content">
          <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
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
                    <p className="comment_writer">{c.writer}</p>
                    <div className="comment_content">{c.comment}</div>
                  </div>
                  <div className="comment_actions">
                    {(loggedInUser === c.writer ||
                      loggedInUser === postWriter) && (
                      <>
                        {loggedInUser === c.writer && (
                          <>
                            <button onClick={() => handleEdit(c.id)}>
                              수정
                            </button>
                            <div className="nav_auth_bar" />
                            <button onClick={() => handleDelete(c.id)}>
                              삭제
                            </button>
                          </>
                        )}
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
        <div className="comment_form_section">
          <form
            className="comment_form"
            onSubmit={editCommentId ? handleEditSubmit : handleSubmit}
          >
            {isLoggedIn && (
              <textarea
                className="comment_textarea"
                value={editCommentId ? editCommentText : comment}
                onChange={
                  editCommentId ? handleEditChange : handleCommentChange
                }
                placeholder={
                  editCommentId ? "댓글을 수정하세요" : "댓글을 입력하세요"
                }
              ></textarea>
            )}
            <div className="button_container">
              {editCommentId ? (
                <>
                  <button className="save_button" type="submit">
                    저장
                  </button>
                  <button
                    className="cancel_button"
                    type="button"
                    onClick={() => setEditCommentId(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {isLoggedIn && (
                    <button className="submit_button" type="submit">
                      글쓰기
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="container_fix">
        <div className="button_container">
          <Link to="/community" className="list_button">
            목록
          </Link>
          {isLoggedIn && (
            <>
              {loggedInUser === postWriter && (
                <>
                  <Link to={`/editChange/${id}`} className="write_button">
                    수정
                  </Link>
                  <button onClick={handlePostDelete} className="delete_button">
                    삭제
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
