import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useLocation, useNavigate } from "react-router-dom";
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
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (!userId) {
      console.error(
        "관리자 전용 페이지입니다. 관리자 전용 아이디로 로그인 해주세요"
      );
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(() => {
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
      console.log("Connected: " + frame);
      setConnected(true);
      client.subscribe(`/sub/room/${roomId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
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
    if (input.trim() && connected) {
      const message = {
        sender: "admin",
        content: input,
        userId: userId,
        roomId: roomId,
        timestamp: new Date().toISOString(),
      };
      stompClient.publish({
        destination: "/pub/sendMessage",
        body: JSON.stringify(message),
      });
      setInput("");
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
              <p className="realchat-user-id">회원아이디</p>
            </div>
            <div className="realchat-container">
              <div id="realchat-window">
                <div id="realchat-messages">
                  {messages.map((msg, index) =>
                    msg.sender === "admin" ? (
                      <React.Fragment key={index}>
                        <p className="realchat-right">{msg.content}</p>
                        <span className={`realchat-right-date`}>
                          {new Date(msg.timestamp).toLocaleTimeString()} 보냄
                        </span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
                        <p className="realchat-left">{msg.content}</p>
                        <span className={`realchat-left-date`}>
                          {new Date(msg.timestamp).toLocaleTimeString()} 받음
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
