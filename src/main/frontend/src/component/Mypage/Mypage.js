import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Mypage.css";
import RentItem from "./Rent_user.js";
import Pagination from "./Pagination.js";

function MyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수
    const [rentItems, setRentItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
//
    useEffect(() => {
        const userInfo = sessionStorage.getItem("userData");
        if (!userInfo) {
            navigate("/login");
        } else {
            fetchRentItems();
        }
    }, [navigate, currentPage]);

    const fetchRentItems = async (userId) => {
        try {
            const response = await axios.get(`api/rents/rentlist/${userId}`);
            setRentItems(response.data.items);
            setTotalItems(response.data.totalItems); // 총 아이템 수를 업데이트
        } catch (error) {
            console.error("대여 내역을 불러오는 중 오류가 발생했습니다:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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

            if (response.data.success) {
                alert("탈퇴 완료되었습니다.");
            }else{
                window.location.href = '/login';   
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
                                <button className="sidebox_quitbutton" onClick={() => navigate("/books")}>나의 보관내역</button>
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
                    <h3>나의 대여내역</h3>
                    <div className="post_line" />
                    <ul className="rent_item">
                        {rentItems && rentItems.map((item) => (
                          <RentItem key={item.rentId} {...item} />
                        ))}
                    </ul>
                    <Pagination
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
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
