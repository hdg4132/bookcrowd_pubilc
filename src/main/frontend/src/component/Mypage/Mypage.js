import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Mypage.css";
import RentItem from "./Rent_user.js";
import Pagination from "./Pagination.js";
import SubBanner from "../SubBanner.js";
import UserChatPage from "../realChat/UserChatPage.js";

const MyPage = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const nav = useNavigate();
    const { page } = useParams();
    const postPerPage = 4;

    useEffect(() => {
        fetch(`http://localhost:8080/rents/rentlist/${userInfo.userId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setCount(data.length);
                console.log(data);
            })
            .catch(error => console.error('Error fetching posts:', error));

        setCount(posts.length);
    }, []);

    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === '' ? posts : posts.filter((it) => it.bookname.includes(search));
    };

    useEffect(() => {
        const indexOfLastPost = (page || currentPage) * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        setCurrentPosts(getSearchResult().slice(indexOfFirstPost, indexOfLastPost));
    }, [page, search, posts, currentPage]);

    const handleChangePage = (page) => {
        const newUrl = `/mypage/${page}`;
        nav(newUrl);
        setCurrentPage(page);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('api/api/auth/logout');
            console.log(response.data);
            sessionStorage.removeItem("userData");
            nav("/login");
        } catch (error) {
            console.error("로그아웃 오류:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    const handleDeleteAccount = async () => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData) {
            alert("로그인이 필요합니다.");
            return;
        }

        const { email } = userData;

        try {
            const response = await axios.delete('http://localhost:8080/api/auth/deleteAccount', {
                params: { email }
            });
            console.log("탈퇴 완료");

            if (response.data.success) {
                alert("탈퇴 완료");
            } else {
                alert("탈퇴 완료되었습니다.");
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("사용자 탈퇴 오류:", error);
            alert("사용자 탈퇴 중 오류가 발생하였습니다.");
        }
    };

    return (
        <div>
            <UserChatPage />
            <div className="mypage_body">
                <SubBanner page_name={"storage"} title_en={"My page"} title_kr={"마이페이지"} />
                <form action="" className="search_form">
                    <input type="text" placeholder="검색어를 입력하세요" value={search} onChange={onChangeSearch} />
                    <button type="submit"><span className="booksearch_icon"></span></button>
                </form>
                <div className="mypage_container">
                    <div className="mypage">
                        <div className="mypage_side">
                            <div className="sidebox">
                                <ul>
                                    <li className="sidebox_text">
                                        <button className="sidebox_quitbutton" onClick={() => nav("/mypage/1")}>나의 대여내역</button>
                                    </li>
                                    <li className="sidebox_text">
                                        <button className="sidebox_quitbutton" onClick={() => nav("/books")}>나의 보관내역</button>
                                    </li>
                                    <li className="sidebox_text">
                                        <button className="sidebox_quitbutton" onClick={() => nav("/wishlist/1")}>위시리스트</button>
                                    </li>
                                    <li className="sidebox_text">
                                        <button className="sidebox_quitbutton" onClick={() => nav("/editprofile")}>회원정보 수정</button>
                                    </li>
                                    <li className="sidebox_text">
                                        <button className="sidebox_quitbutton" onClick={handleDeleteAccount}>탈퇴하기</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="content_body">
                        <div className="mypage_list">
                            <ul className="booklist_con">
                                {currentPosts && currentPosts.map((it) => (
                                    <RentItem key={it.id}{...it} />
                                ))}
                            </ul>
                        </div>
                        <div className="mypage_paging">
                        <Pagination page={page || currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
