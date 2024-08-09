import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function MyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = sessionStorage.getItem("userData");
        if (!userInfo) {
            navigate("/login");
        }
    }, [navigate]);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteAccount = async () => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData) {
            alert("로그인이 필요합니다.");
            return;
        }

        const { email } = userData; // userData에서 이메일을 가져옵니다.

        try {
            const response = await axios.delete('api/api/auth/deleteAccount', {
                params: { email } // 쿼리 파라미터로 이메일을 전달
            });

            if (response.data.success) {
                setShowPopup(true);
                sessionStorage.clear(); // 세션 정보 초기화
                setTimeout(() => {
                    navigate('/login'); // 3초 후 로그인 페이지로 리다이렉션
                }, 3000); // 3초 후 이동
            } else {
                alert("사용자 탈퇴에 실패하였습니다.");
            }
        } catch (error) {
            console.error("사용자 탈퇴 오류:", error);
            alert("사용자 탈퇴 중 오류가 발생하였습니다.");
        }
    };

    const handleConfirm = () => {
        setShowPopup(false);
        navigate("/login");
    };

    return (
        <div>
            <div id="sub_banner">
                <div className="container_fix">
                    <h2>MyPage</h2>
                    <p>마이페이지</p>
                </div>
            </div>
            <div className="mypage">
                <div className="mypage_header">
                    <p className="mypage_text">마이페이지</p>
                    <div className="Line3"></div>
                </div>
                <div className="mypage_side">
                    <div className="sidebox">
                        <ul>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={() => navigate("/mypage")}>나의 대여내역</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={() => navigate("/mybookstorage")}>나의 보관내역</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={() => navigate("/wishlist")}>위시리스트</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={() => navigate("/editprofile")}>회원정보 수정</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={handleDeleteAccount}>탈퇴하기</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="MyTicketing">
                    <h3>위시리스트</h3>
                    <div className="post_line" />
                </div>
            </div>
            {showPopup && (
                <div className="popup show">
                    <p>회원탈퇴 완료했습니다.</p>
                    <button onClick={handleConfirm}>확인</button>
                </div>
            )}
        </div>
    );
}

export default MyPage;
