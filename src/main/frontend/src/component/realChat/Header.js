import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ title, backButton, showSearch }) => {
    const navigate = useNavigate();

    return (
        <header className="admin-header">
            <div className="header-wrapper">
                <div className="home-button">
                    <button type="button" onClick={() => navigate('/')}>홈페이지</button>
                </div>
                <div className="header-content">
                    <div className="chat-management">
                        <p>{title}</p>
                    </div>
                    {backButton && (
                        <div className="back-button">
                            <button type="button" onClick={() => navigate('/chatpage')}>회원목록</button>
                        </div>
                    )}
                    {showSearch && (
                        <div className="user-search">
                            <input type="text" placeholder="회원 검색" />
                            <button className="search-button">
                                <img src="/images/search-icon.png" alt="검색" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
