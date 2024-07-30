import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './reset.css';
import './ChatPage.css';

const ChatPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="1:1 채팅관리" showSearch={true}/>
            <Sidebar />
            <div className="chat-wrapper">
                <div className="chat-content">
                    <div className="user-info-wrapper">
                        <div className="chat-user-info">
                            <p className="user-id">회원아이디</p>
                            <p className="question-title">질문 제목</p>
                        </div>
                        <div className="user-list">
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/realchat')}>채팅하기</button>
                                </div>
                            </div>
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/userchat')}>채팅하기</button>
                                </div>
                            </div>
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/userchat')}>채팅하기</button>
                                </div>
                            </div>
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/userchat')}>채팅하기</button>
                                </div>
                            </div>
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/userchat')}>채팅하기</button>
                                </div>
                            </div>
                            <div className="user-item">
                                <div className="user-item-details">
                                    <ul>
                                        <li>유저아이디 값? 닉네임?</li>
                                        <li>질문 제목</li>
                                    </ul>
                                </div>
                                <div className="user-item-actions">
                                    <button type="button" onClick={() => navigate('/userchat')}>채팅하기</button>
                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                </div>
                <div className="pagination-wrapper">
                    <nav aria-label="pagination">
                        <ul className="pagination">
                            <li><button type="button" onClick={() => navigate('#')}><img src="/images/leftmanynext.png" alt="left many next" /></button></li>
                            <li><button type="button" onClick={() => navigate('#')}><img src="/images/leftnext.png" alt="left next" /></button></li>
                            <li><button type="button" onClick={() => navigate('#')}>1</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>2</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>3</button></li>
                            <li className="current-page"><button type="button" onClick={() => navigate('#')}>4</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>5</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>6</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>7</button></li>
                            <li><button type="button" onClick={() => navigate('#')}>8</button></li>
                            <li><button type="button" onClick={() => navigate('#')}><img src="/images/rightnext.png" alt="right next" /></button></li>
                            <li><button type="button" onClick={() => navigate('#')}><img src="/images/rightmanynext.png" alt="right many next" /></button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
