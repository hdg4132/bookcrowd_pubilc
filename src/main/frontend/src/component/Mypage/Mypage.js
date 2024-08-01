import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from './Paging.js';
import { useNavigate } from "react-router-dom";
import "./Mypage.css";

function MyPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [orders, setOrders] = useState([]);
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
        try {
            const response = await axios.delete(`/orders/deleteAccount`);

            if (response.data === "Account deleted successfully") {
                setShowPopup(true);
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

    // const displayOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                            <button className="sidebox_quitbutton">나의 대여내역</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton" onClick={() => navigate("/books")}>나의 보관내역</button>
                            </li>
                            <li className="sidebox_text">
                                <button className="sidebox_quitbutton">위시리스트</button>
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
                    {/* {displayOrders.map((order) => (
                        <div key={order.id}>
                            <div className="movie_info">
                                <div className="movieImage"/>
                                <div className="info_text">
                                    <p className="movie_text1"></p>
                                    <p className="movie_text2"></p>
                                    <p className="movie_text3"></p>
                                </div>
                            </div>
                            <div className="post_line" />
                        </div>
                    ))} */}
                    {/* <Pagination
                        itemsPerPage={itemsPerPage}
                        onPageChange={onPageChange}
                    /> */}
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
