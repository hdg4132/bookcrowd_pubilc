import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./reset.css";
import "./ChatPage.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredChatRooms, setFilteredChatRooms] = useState([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chat/rooms")
      .then((response) => {
        setChatRooms(response.data);
        setFilteredChatRooms(response.data);
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = chatRooms.filter((room) =>
      room.email ? room.email.toLowerCase().includes(searchTerm.toLowerCase()) : false
    );
    setFilteredChatRooms(filtered);
  }, [searchTerm, chatRooms]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredChatRooms.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const handleManyPageChange = (increment) => {
    let targetPage = currentPage + increment;
    if (targetPage < 1) {
      targetPage = 1;
    } else if (
      targetPage > Math.ceil(filteredChatRooms.length / itemsPerPage)
    ) {
      targetPage = Math.ceil(filteredChatRooms.length / itemsPerPage);
    }
    setCurrentPage(targetPage);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentChatRooms = filteredChatRooms.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handleChat = (roomId, email) => {
    if (roomId && email) {
      navigate(`/realchat?roomId=${roomId}&email=${email}`);
    } else {
      console.error("Invalid roomId or email:", roomId, email);
    }
  };

  return (
    <div>
      <Header
        title="1:1 채팅 관리"
        showSearch={true}
        onSearchChange={handleSearchChange}
      />
      <Sidebar />
      <div className="chat-wrapper">
        <div className="chat-content">
          <div className="user-info-wrapper">
            <div className="chat-user-info">
              <p className="user-status">상태</p>
              <p className="user-id">회원 이메일</p> {/* 회원아이디 -> 회원 이메일 */}
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
                      <li>{room.email || "알 수 없는 사용자"}</li> {/* userId 대신 email */}
                      <li>{room.latestMessage || "대화 없음"}</li>
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
            <ul className="pagination">
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
              {[
                ...Array(Math.ceil(filteredChatRooms.length / itemsPerPage)),
              ].map((_, index) => (
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
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredChatRooms.length / itemsPerPage)
                  }
                >
                  <img src="/images/rightnext.png" alt="right next" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleManyPageChange(5)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredChatRooms.length / itemsPerPage)
                  }
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