import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './reset.css';
import './UserChatPage.css';
import { useLocation } from 'react-router-dom';

const UserChatPage = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const messagesEndRef = useRef(null);
    // const location = useLocation();
    // const roomId = new URLSearchParams(location.search).get('roomId');
    const [roomId, setRoomId] = useState();
    const [user, setUser] =useState();
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    useEffect(() => {
        setRoomId(userinfo.id)
        setUser(userinfo)
    }, [])

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });
        stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            setConnected(true);
            stompClient.subscribe(`/sub/room`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        };
        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
        stompClient.activate();
        setStompClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [roomId]);

    console.log(messages)
    console.log(String(roomId))
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    const handleSend = () => {
        if (input.trim() && connected) {
            const message = { sender: "user", content: input,userId:user.id, roomId: roomId, time: new Date().toLocaleTimeString() };
            stompClient.publish({ destination: '/pub/sendMessage', body: JSON.stringify(message) });
            setInput("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
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
                            <img src='/images/close.png' alt='close' />
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
                                        <img className="userchat-profile-pic" src="/images/MainLogo.png" alt="프로필 사진" />
                                        <div className="userchat-message-wrapper">
                                            <div className="userchat-message-content">
                                                <p>{msg.content}</p>
                                            </div>
                                            <span className={`userchat-date-${msg.sender}`}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    </>
                                ) :(
                                    <div className="userchat-message-wrapper">
                                        <div className="userchat-message-content">
                                            <p>{msg.content}</p>
                                        </div>
                                        <span className={`userchat-date-${msg.sender}`}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ) }
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
                        <button className="userchat-send-button" onClick={handleSend}>보내기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserChatPage;