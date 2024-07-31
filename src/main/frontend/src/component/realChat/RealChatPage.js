import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from './Sidebar';
import Header from './Header';
import './reset.css';
import './RealChatPage.css';
import { useLocation } from 'react-router-dom';

const RealChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const messagesEndRef = useRef(null);
    const location = useLocation();
    const roomId = new URLSearchParams(location.search).get('roomId');

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

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (input.trim() && connected) {
            const message = { sender: "admin", content: input, roomId: roomId, time: new Date().toLocaleTimeString() };
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
                                    {messages.map((msg, index) => (
                                        msg.sender === "admin" ? (
                                            <React.Fragment key={index}>
                                                <p className="realchat-right">{msg.content}</p>
                                                <span className={`realchat-right-date-${msg.sender}`}>{new Date(msg.timestamp).toLocaleTimeString()} 보냄</span>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={index}>
                                                <p className="realchat-left">{msg.content}</p>
                                                <span className={`realchat-left-date-${msg.sender}`}>{new Date(msg.timestamp).toLocaleTimeString()} 보냄</span>
                                            </React.Fragment>
                                        ) 
                                    ))}
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
                                    <button className="realchat-send-button" onClick={handleSend}>전송</button> 
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