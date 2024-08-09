import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mypage.css";

function MyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수
    const [rentItems, setRentItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const userInfo = JSON.parse(sessionStorage.getItem("userData"));

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            fetchRentItems();
        }
    }, [navigate, currentPage]);

    console.log(userInfo.userId);

    const fetchRentItems = async () => {
        try {
            const response = await axios.get(`api/rents/rentlist/${userInfo.userId}?page=${currentPage}`);
            console.log(response);
            setRentItems(response.data); // 현재 페이지의 항목들 설정
            setTotalItems(parseInt(response.headers['x-total-count'], 10)); // 총 항목 수 설정 (헤더에서 가져오는 경우)
        } catch (error) {
            console.error("대여 내역을 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log(totalItems, itemsPerPage, currentPage);

    const handleDeleteAccount = async () => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData) {
            alert("로그인이 필요합니다.");
            return;
        }

        const { email } = userData;

        try {
            const response = await axios.delete('api/api/auth/deleteAccount', {
                params: { email }
            });
            console.log("탈퇴 완료");

            if (response.data.success) {
                alert("탈퇴 완료되었습니다.");
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("사용자 탈퇴 오류:", error);
            alert("사용자 탈퇴 중 오류가 발생하였습니다.");
        }
    };

    const handleConfirm = () => {
        setShowPopup(true);
        navigate("/login");
    };

    // totalPages 계산
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                    <div className="wishlist_line" />
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
