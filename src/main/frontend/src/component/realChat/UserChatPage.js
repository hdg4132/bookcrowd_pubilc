import React, { useState } from 'react';
import './reset.css';
import './UserChatPage.css'

const UserChatPage = () => {
    // 채팅 창의 열림/닫힘 상태를 관리하는 상태 변수
    const [chatOpen, setChatOpen] = useState(false);
    // 메시지를 저장하는 상태 변수
    const [messages, setMessages] = useState([]);
    // 입력된 텍스트를 저장하는 상태 변수
    const [input, setInput] = useState("");

    // 채팅 창의 열림/닫힘 상태를 토글하는 함수
    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    // 메시지를 보내는 함수
    const handleSend = () => {
        if (input.trim()) { // 입력값이 있는 경우에만 실행
            // 사용자가 보낸 메시지를 상태에 추가
            setMessages([...messages, { sender: "user", text: input, time: new Date().toLocaleTimeString() }]);
            setInput(""); // 입력 필드 초기화
            // 1초 후 관리자가 보낸 메시지를 상태에 추가 (예시)
            setTimeout(() => {
                setMessages(messages => [...messages, { sender: "admin", text: "관리자의 응답dddddddddddddddddddddddddddddddddd 메시지", time: new Date().toLocaleTimeString() }]);
            }, 1000);
        }
    };

    return (
        <div className="userchat-wrapper">
            {/* 채팅 아이콘 로고로 변경할 예정 */}
            <div id="userchat-icon">
                {!chatOpen ? (
                    <button onClick={toggleChat}>
                        <img src="/images/chat.png" alt="chat icon" />
                    </button>
                ) : (
                    <div id="userchat-close">
                        <button onClick={toggleChat}>
                            <img src='/images/close.png' alt='close' />
                        </button>
                    </div>
                )}
            </div>
            {/* 채팅 창이 열렸을 때만 표시 */}
            {chatOpen && (
                <div id="userchat-window">
                    {/* 채팅 헤더 */}
                    <div className="userchat-header">
                        <p>실시간채팅</p>
                    </div>
                    {/* 메시지 영역 */}
                    <div id="userchat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`userchat-${msg.sender}`}>
                                {msg.sender === "admin" && (
                                    // 프로필 사진은 로고로 변경    
                                    <img className="userchat-profile-pic" src="/images/pic.png" alt="프로필 사진" />
                                )}
                                <div className="userchat-message-wrapper">
                                    <div className="userchat-message-content">
                                        <p>{msg.text}</p>
                                    </div>
                                    <span className={`userchat-date-${msg.sender}`}>{msg.time} 보냄</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* 메시지 입력 영역 */}
                    <div className="userchat-textarea-wrapper">
                        <textarea
                            id="userchat-textarea"
                            placeholder="메세지 입력하셈"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                        <button className="userchat-send-button" onClick={handleSend}>보내기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserChatPage;
