import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import "./reset.css";
import "./UserChatPage.css";

const UserChatPage = () => {
  const [chatOpen, setChatOpen] = useState(false); // 채팅창 열림/닫힘 상태
  const [messages, setMessages] = useState([]); // 메시지 리스트
  const [input, setInput] = useState(""); // 입력 필드 상태
  const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트
  const [connected, setConnected] = useState(false); // WebSocket 연결 상태
  const messagesEndRef = useRef(null); // 메시지 리스트의 마지막 요소에 대한 참조

  const userinfo = JSON.parse(sessionStorage.getItem("userData")); // 세션 스토리지에서 사용자 정보 가져오기
  const userId = userinfo ? userinfo.userId : null; // 사용자 ID
  const email = userinfo ? userinfo.email : null; // 사용자 이메일
  const [roomId, setRoomId] = useState(null); // 채팅방 ID 상태

  // WebSocket 연결 설정
  useEffect(() => {
    if (!userId) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws"); // SockJS 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 재연결 지연 시간
      heartbeatIncoming: 4000, // 수신 하트비트 주기
      heartbeatOutgoing: 4000, // 발신 하트비트 주기
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log("WebSocket 연결 성공: " + frame);
        setConnected(true);

        // roomId가 설정된 경우 구독
        if (roomId) {
          subscribeToRoom(client, roomId);
        }
      },
      onStompError: (frame) => {
        console.error("STOMP 브로커 오류: " + frame.headers["message"]);
        console.error("추가 정보: " + frame.body);
      },
    });

    client.activate(); // WebSocket 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트

    return () => {
      if (client) {
        client.deactivate(); // 컴포넌트가 언마운트될 때 WebSocket 클라이언트 비활성화
      }
    };
  }, [userId]);

  // 채팅창 열기/닫기
  const toggleChat = () => {
    if (!chatOpen) {
      // 채팅창을 여는 경우 기존 메시지를 가져오고 구독 설정
      if (roomId) {
        // 이미 채팅방이 존재하는 경우
        subscribeToRoom(stompClient, roomId);
      } else {
        // 채팅방이 없는 경우 생성
        axios
          .post("http://localhost:8080/chat/createRoom", {
            userId: userId,
            adminId: "admin",
            email: email,
          })
          .then((response) => {
            const room = response.data;
            setRoomId(room.roomId); // 채팅방 ID 상태 업데이트
            subscribeToRoom(stompClient, room.roomId);
          })
          .catch((error) => {
            console.error("채팅방 생성 오류:", error);
          });
      }
    }
    setChatOpen(!chatOpen);
  };

  // 채팅방이 생성되거나 이미 존재하는 경우 메시지를 구독하는 함수
  const subscribeToRoom = (client, roomId) => {
    client.subscribe(`/sub/room/${roomId}`, (message) => {
      const newMessage = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // 기존 메시지 가져오기
    axios
      .get(`http://localhost:8080/chat/rooms/${roomId}/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("기존 메시지 불러오기 중 오류 발생:", error);
      });
  };

  // 새 메시지가 도착하면 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지 전송
  const handleSend = () => {
    if (input.trim() && connected) {
      const message = {
        sender: "user",
        content: input,
        userId: userId,
        email: email,
        roomId: roomId,
        timestamp: new Date().toISOString(),
      };

      // 메시지를 서버에 저장하고 WebSocket으로 전송
      axios
        .post("http://localhost:8080/chat/messages", message)
        .then(() => {
          console.log("메시지가 저장되었습니다.");
          // WebSocket으로 메시지 전송
          stompClient.publish({
            destination: `/pub/sendMessage`,
            body: JSON.stringify(message),
          });
          setInput(""); // 입력 필드 초기화
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error);
        });
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="userchat-wrapper">
      <div id="userchat-icon">
        {!chatOpen ? (
          <button onClick={toggleChat}>
            <img src="/images/MainLogo.png" alt="chat icon" />
          </button>
        ) : (
          <div id="userchat-close">
            <button onClick={toggleChat}>
              <img src="/images/close.png" alt="close" />
            </button>
          </div>
        )}
      </div>
      {chatOpen && (
        <div id="userchat-window">
          <div className="userchat-header">
            <p>실시간채팅</p>
          </div>
          <div id="userchat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`userchat-${msg.sender}`}>
                {msg.sender === "admin" ? (
                  <>
                    <img
                      className="userchat-profile-pic"
                      src="/images/MainLogo.png"
                      alt="프로필 사진"
                    />
                    <div className="userchat-message-wrapper">
                      <div className="userchat-message-content">
                        <p>{msg.content}</p>
                      </div>
                      <span className={`userchat-date-${msg.sender}`}>
                        {new Date(msg.timestamp).toLocaleString("ko-KR", {
                          timeZone: "Asia/Seoul",
                        })}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="userchat-message-wrapper">
                    <div className="userchat-message-content">
                      <p>{msg.content}</p>
                    </div>
                    <span className={`userchat-date-${msg.sender}`}>
                      {new Date(msg.timestamp).toLocaleString("ko-KR", {
                        timeZone: "Asia/Seoul",
                      })}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="userchat-textarea-wrapper">
            <textarea
              id="userchat-textarea"
              placeholder="메세지를 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            ></textarea>
            <button className="userchat-send-button" onClick={handleSend}>
              보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChatPage;