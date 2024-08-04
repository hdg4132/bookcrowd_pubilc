import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./reset.css";
import "./RealChatPage.css";

const RealChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("roomId");
  const email = queryParams.get("email");

  useEffect(() => {
    if (!email) {
      console.error("관리자 전용 페이지입니다. 관리자 전용 아이디로 로그인 해주세요");
      navigate("/login");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!roomId) {
      console.error("유효하지 않은 채팅방 ID입니다.");
      return;
    }

    axios
      .get(`http://localhost:8080/chat/rooms/${roomId}/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("메시지를 불러오는 중 오류 발생:", error);
      });

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log(str);
      },
    });

    client.onConnect = (frame) => {
      console.log("WebSocket 연결 성공: " + frame);
      setConnected(true);
      client.subscribe(`/sub/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP 브로커 오류: " + frame.headers["message"]);
      console.error("추가 정보: " + frame.body);
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && connected && stompClient) {
      const message = {
        sender: "admin",
        content: input,
        email: email,
        roomId: roomId,
        timestamp: new Date().toISOString(), // UTC 시간으로 설정
      };

      // 메시지를 서버에 저장
      axios
        .post("http://localhost:8080/chat/messages", message)
        .then((response) => {
          console.log("메시지가 저장되었습니다:", response.data);
        })
        .catch((error) => {
          console.error("메시지 저장 중 오류 발생:", error);
        });

      stompClient.publish({
        destination: "/pub/sendMessage",
        body: JSON.stringify(message),
      });
      setInput("");
    } else {
      console.error("메시지를 보낼 수 없습니다. 연결 상태를 확인하세요.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <Header title="1:1 채팅관리" backButton={true} />
      <Sidebar />
      <div className="realchat-main-content">
        <div className="realchat-wrapper">
          <div className="realchat-user-info-wrapper">
            <div className="realchat-user-info">
              <p className="realchat-user-id">
                회원 이메일: {email || "알 수 없는 사용자"}
              </p>
            </div>
            <div className="realchat-container">
              <div id="realchat-window">
                <div id="realchat-messages">
                  {messages.map((msg, index) =>
                    msg.sender === "admin" ? (
                      <React.Fragment key={index}>
                        <p className="realchat-right">{msg.content}</p>
                        <span className={`realchat-right-date`}>
                          {new Date(msg.timestamp).toLocaleString("ko-KR", {
                            timeZone: "Asia/Seoul",
                          })}{" "}
                          보냄
                        </span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <p className="realchat-left">{msg.content}</p>
                        <span className={`realchat-left-date`}>
                          {new Date(msg.timestamp).toLocaleString("ko-KR", {
                            timeZone: "Asia/Seoul",
                          })}{" "}
                          받음
                        </span>
                      </React.Fragment>
                    )
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="realchat-textarea-wrapper">
                  <textarea
                    id="realchat-textarea"
                    placeholder="메세지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  ></textarea>
                  <button className="realchat-send-button" onClick={handleSend}>
                    전송
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealChatPage;