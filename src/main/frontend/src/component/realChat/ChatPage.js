import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './reset.css';
import './ChatPage.css';
import axios from 'axios';

const ChatPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        axios.get('http://localhost:8080/chat/rooms')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the chat rooms!', error);
            });
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleManyPageChange = (increment) => {
        let targetPage = currentPage + increment;
        if (targetPage < 1) {
            targetPage = 1;
        } else if (targetPage > totalPages) {
            targetPage = totalPages;
        }
        setCurrentPage(targetPage);
    };

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div>
            <Header title="1:1 채팅관리" showSearch={true} onSearchChange={handleSearchChange} />
            <Sidebar />
            <div className="chat-wrapper">
                <div className="chat-content">
                    <div className="user-info-wrapper">
                        <div className="chat-user-info">
                            <p className='user-status'>상태</p>
                            <p className="user-id">회원아이디</p>
                            <p className="question-title">대화 미리보기</p>
                        </div>
                        <div className="user-list">
                            {currentUsers.map(user => (
                                <div key={user.id} className={`user-item ${user.unread ? 'unread' : ''}`}>
                                    <div className="user-item-details">
                                        <ul>
                                            <li className="read-status">{user.unread ? '안읽음' : '읽음'}</li>
                                            <li>{user.username}</li>
                                            <li>{user.message}</li>
                                        </ul>
                                    </div>
                                    <div className="user-item-actions">
                                        <button type="button" onClick={() => navigate(`/realchat?roomId=${user.id}`)}>채팅하기</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pagination-wrapper">
                    <nav aria-label="pagination">
                        <ul className="pagination">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handleManyPageChange(-5)}
                                    disabled={currentPage === 5}>
                                    <img src="/images/leftmanynext.png" alt="left many next" />
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}>
                                    <img src="/images/leftnext.png" alt="left next" />
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={currentPage === index + 1 ? 'current-page' : ''}>
                                    <button type="button" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}>
                                    <img src="/images/rightnext.png" alt="right next" />
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => handleManyPageChange(5)}
                                    disabled={currentPage === - 1}>
                                    <img src="/images/rightmanynext.png" alt="right many next" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;