import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="sidebar">
            <div className="nav-wrapper">
                <ul>
                    <li id="site-title"><a className="active" href="#">
                        <p>홈페이지명ㅣ<span>ADMIN</span></p></a></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/')}>회원관리</button></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/userchat')}>임시 버튼 유저 채팅</button></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/realchat')}>1:1 채팅관리</button></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/')}>책 보관 관리</button></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/')}>책 재고 관리</button></li>
                    <li className="nav-item"><button type="button" onClick={() => navigate('/')}>커뮤니티 게시판 관리</button></li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
