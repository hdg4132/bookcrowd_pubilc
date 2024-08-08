import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reset.css";
import "./ChatPage.css";
import AdmLayout from "../AdmLayout";

const ChatPage = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chat/rooms")
      .then((response) => {
        setChatRooms(response.data);
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(chatRooms.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleManyPageChange = (increment) => {
    let targetPage = currentPage + increment;
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > Math.ceil(chatRooms.length / itemsPerPage)) {
      targetPage = Math.ceil(chatRooms.length / itemsPerPage);
    }
    setCurrentPage(targetPage);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentChatRooms = chatRooms.slice(startIdx, startIdx + itemsPerPage);

  const handleChat = (roomId, email) => {
    if (roomId && email) {
      navigate(`/adm/realchat?roomId=${roomId}&email=${email}`);
    } else {
      console.error("Invalid roomId or email:", roomId, email);
    }
  };

  return (
    <div>
      <AdmLayout />
      <div className="chat-wrapper">
        <div className="chat-content">
          <div className="user-info-wrapper">
            <div className="chat-user-info">
              <p className="user-status">상태</p>
              <p className="user-id">회원 이메일</p>
              <p className="question-title">대화 미리보기</p>
            </div>
            <div className="user-list">
              {currentChatRooms.map((room) => (
                <div
                  key={room.roomId}
                  className={`user-item ${room.unread ? "unread" : ""}`}
                >
                  <div className="user-item-details">
                    <ul>
                      <li className="read-status">
                        {room.unread ? "안읽음" : "읽음"}
                      </li>
                      <li>{room.email || "알 수 없는 사용자"}</li>
                      <li className="room-lates-message">{room.latestMessage || "대화 없음"}</li>
                    </ul>
                  </div>
                  <div className="user-item-actions">
                    <button
                      type="button"
                      onClick={() => handleChat(room.roomId, room.email)}
                    >
                      채팅하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pagination-wrapper">
          <nav aria-label="pagination">
            <ul className="adm-pagination">
              <li>
                <button
                  type="button"
                  onClick={() => handleManyPageChange(-5)}
                  disabled={currentPage === 1}
                >
                  <img src="/images/leftmanynext.png" alt="left many next" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <img src="/images/leftnext.png" alt="left next" />
                </button>
              </li>
              {[...Array(Math.ceil(chatRooms.length / itemsPerPage))].map(
                (_, index) => (
                  <li
                    key={index}
                    className={currentPage === index + 1 ? "current-page" : ""}
                  >
                    <button
                      type="button"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(chatRooms.length / itemsPerPage)}
                >
                  <img src="/images/rightnext.png" alt="right next" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleManyPageChange(5)}
                  disabled={currentPage === Math.ceil(chatRooms.length / itemsPerPage)}
                >
                  <img src="/images/rightmanynext.png" alt="right many next" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;