import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import "./reset.css";
import "./UserChatPage.css";

const UserChatPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const userinfo = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userinfo ? userinfo.userId : null; // 사용자 ID를 세션에서 가져옵니다.
  const email = userinfo ? userinfo.email : null;
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log("WebSocket 연결 성공: " + frame);
        setConnected(true);

        if (!roomId) {
          axios
            .post("http://localhost:8080/chat/createRoom", {
              userId: userId,
              adminId: "admin",
              email: email,
            })
            .then((response) => {
              setRoomId(response.data.roomId);
              client.subscribe(`/sub/room/${response.data.roomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              });

              // 서버에서 기존 메시지 가져오기
              axios
                .get(`http://localhost:8080/chat/rooms/${response.data.roomId}/messages`)
                .then((res) => {
                  setMessages(res.data);
                })
                .catch((error) => {
                  console.error("기존 메시지 불러오기 중 오류 발생:", error);
                });
            })
            .catch((error) => {
              console.error("채팅방 생성 오류:", error);
            });
        } else {
          client.subscribe(`/sub/room/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });

          // 서버에서 기존 메시지 가져오기
          axios
            .get(`http://localhost:8080/chat/rooms/${roomId}/messages`)
            .then((res) => {
              setMessages(res.data);
            })
            .catch((error) => {
              console.error("기존 메시지 불러오기 중 오류 발생:", error);
            });
        }
      },
      onStompError: (frame) => {
        console.error("STOMP 브로커 오류: " + frame.headers["message"]);
        console.error("추가 정보: " + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [userId, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSend = () => {
    if (input.trim() && connected) {
      const message = {
        sender: "user",
        content: input,
        userId: userId, // userId를 메시지에 포함
        email: email,
        roomId: roomId,
        timestamp: new Date().toISOString(),
      };

      // 메시지를 서버에 저장
      axios
        .post("http://localhost:8080/chat/messages", message)
        .then((response) => {
          console.log("메시지가 저장되었습니다:", response.data);

          // WebSocket으로 메시지 전송
          stompClient.publish({
            destination: `/pub/sendMessage`,
            body: JSON.stringify(message),
          });

          setInput("");
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error);
        });
    }
  };

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
