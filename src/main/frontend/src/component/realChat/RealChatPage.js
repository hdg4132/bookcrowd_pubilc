import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './reset.css';
import './RealChatPage.css';

const RealChatPage = () => {
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
                                <p className="realchat-left">안녕하3</p>
                                    <span className="realchat-left-date">2024.07.16 17:59 보냄</span>
                                    <p className="realchat-right">어 goorap</p>
                                    <span className="realchat-right-date">2024.07.16 17:59 보냄</span>
                                    
                                </div>
                                <div className="realchat-textarea-wrapper">
                                    <textarea id="realchat-textarea" placeholder="textarea로 변경 위에 채팅에 메모 보기"></textarea>
                                    <button className="realchat-send-button">전송</button> 
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
