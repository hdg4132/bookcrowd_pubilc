import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reset.css";
import "./ChatPage.css";
import AdmLayout from "../AdmLayout";

const ChatPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [chatRooms, setChatRooms] = useState([]); // 전체 채팅방 목록 상태
  const itemsPerPage = 8; // 페이지당 표시할 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  // 컴포넌트가 마운트될 때 서버에서 채팅방 목록을 가져옴
  useEffect(() => {
    axios
      .get("http://localhost:8080/chat/rooms")
      .then((response) => {
        setChatRooms(response.data); // 가져온 채팅방 목록을 상태에 저장
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
      });
  }, []);

  // 페이지 번호를 변경하는 함수
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(chatRooms.length / itemsPerPage)) {
      setCurrentPage(pageNumber); // 현재 페이지 상태 업데이트
    }
  };

  // 페이지네이션
  const handleManyPageChange = (increment) => {
    let targetPage = currentPage + increment;
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > Math.ceil(chatRooms.length / itemsPerPage)) {
      targetPage = Math.ceil(chatRooms.length / itemsPerPage);
    }
    setCurrentPage(targetPage); // 현재 페이지 상태 업데이트
  };

  // 현재 페이지에 해당하는 채팅방 목록을 계산하여 표시
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentChatRooms = chatRooms.slice(startIdx, startIdx + itemsPerPage);

  // 채팅방 클릭 시 해당 채팅방으로 이동
  const handleChat = (roomId, email) => {
    if (roomId && email) {
      navigate(`/adm/realchat?roomId=${roomId}&email=${email}`);
    } else {
      console.error("Invalid roomId or email:", roomId, email);
    }
  };

  // 채팅방 목록을 불러와서, 읽지 않은 메시지가 있는 채팅방을 위로 정렬
  useEffect(() => {
    axios
      .get("http://localhost:8080/chat/rooms")
      .then((response) => {
        const sortedRooms = response.data.sort((a, b) => {
          if (a.unread && !b.unread) return -1; // a가 unread이고 b가 읽은 상태면 a가 먼저 오도록 함
          if (!a.unread && b.unread) return 1;  // b가 unread이고 a가 읽은 상태면 b가 먼저 오도록 함
          return 0;
        });
        setChatRooms(sortedRooms); // 정렬된 채팅방 목록을 상태에 저장
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
      });
  }, []);
  
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