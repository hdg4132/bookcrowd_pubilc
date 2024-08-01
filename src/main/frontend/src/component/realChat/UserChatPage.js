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
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (!userinfo) return;

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
        console.log("Connected: " + frame);
        setConnected(true);

        axios
          .post("http://localhost:8080/chat/createRoom", {
            userId: userinfo.id,
            adminId: "admin",
          })
          .then((response) => {
            setRoomId(response.data.roomId);
            client.subscribe(`/sub/room/${response.data.roomId}`, (message) => {
              const newMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
          })
          .catch((error) => {
            console.error("채팅방 생성 오류:", error);
          });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSend = () => {
    if (input.trim() && connected && roomId) {
      const message = {
        sender: "user",
        content: input,
        userId: userinfo.id,
        roomId: roomId,
        timestamp: new Date().toISOString(),
      };
      stompClient.publish({
        destination: `/pub/sendMessage`,
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
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="userchat-message-wrapper">
                    <div className="userchat-message-content">
                      <p>{msg.content}</p>
                    </div>
                    <span className={`userchat-date-${msg.sender}`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
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
