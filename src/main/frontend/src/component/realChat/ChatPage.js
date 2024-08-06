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

  useEffect(() => {
    // 서버로부터 채팅방 목록을 가져옴
    axios
      .get("http://localhost:8080/chat/rooms")
      .then((response) => {
        setChatRooms(response.data); // 전체 채팅방 목록을 상태에 저장
      })
      .catch((error) => {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
      });
  }, []);

  // 페이지 번호가 유효한 범위 내에 있을 때만 페이지를 변경
  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(chatRooms.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber); // 현재 페이지 상태 업데이트
    }
  };

  // 페이지를 여러 단계로 이동하는 함수
  const handleManyPageChange = (increment) => {
    let targetPage = currentPage + increment;
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > Math.ceil(chatRooms.length / itemsPerPage)) {
      targetPage = Math.ceil(chatRooms.length / itemsPerPage);
    }
    setCurrentPage(targetPage); // 현재 페이지 상태 업데이트
  };

  // 현재 페이지에 표시할 채팅방 목록 계산
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentChatRooms = chatRooms.slice(startIdx, startIdx + itemsPerPage);

  // 특정 채팅방으로 이동하는 함수
  const handleChat = (roomId, email) => {
    if (roomId && email) {
      navigate(`/adm/realchat?roomId=${roomId}&email=${email}`); // 채팅방으로 이동
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
                  className={`user-item ${room.unread ? "unread" : ""}`} // 읽지 않은 메시지가 있으면 "unread" 클래스 적용
                >
                  <div className="user-item-details">
                    <ul>
                      <li className="read-status">
                        {room.unread ? "안읽음" : "읽음"}
                      </li>
                      <li>{room.email || "알 수 없는 사용자"}</li>
                      <li>{room.latestMessage || "대화 없음"}</li>
                    </ul>
                  </div>
                  <div className="user-item-actions">
                    <button
                      type="button"
                      onClick={() => handleChat(room.roomId, room.email)} // 채팅방으로 이동
                    >
                      채팅하기 {/* 채팅하기 버튼 */}
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
                  onClick={() => handleManyPageChange(-5)} // 페이지를 5단계 뒤로 이동
                  disabled={currentPage === 1} // 첫 페이지일 경우 비활성화
                >
                  <img src="/images/leftmanynext.png" alt="left many next" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)} // 이전 페이지로 이동
                  disabled={currentPage === 1} // 첫 페이지일 경우 비활성화
                >
                  <img src="/images/leftnext.png" alt="left next" />
                </button>
              </li>
              {/* 페이지 번호 목록 생성 */}
              {[...Array(Math.ceil(chatRooms.length / itemsPerPage))].map(
                (_, index) => (
                  <li
                    key={index}
                    className={currentPage === index + 1 ? "current-page" : ""} // 현재 페이지 강조
                  >
                    <button
                      type="button"
                      onClick={() => handlePageChange(index + 1)} // 해당 페이지로 이동
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)} // 다음 페이지로 이동
                  disabled={
                    currentPage === Math.ceil(chatRooms.length / itemsPerPage) // 마지막 페이지일 경우 비활성화
                  }
                >
                  <img src="/images/rightnext.png" alt="right next" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleManyPageChange(5)} // 페이지를 5단계 앞으로 이동
                  disabled={
                    currentPage === Math.ceil(chatRooms.length / itemsPerPage) // 마지막 페이지일 경우 비활성화
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
