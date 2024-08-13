import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Mypage.css";
import SubBanner from "../SubBanner";
import Pagination from "./Pagination";
import UserChatPage from "../realChat/UserChatPage.js";
import WishlistItem from "./WishlistItem.js";

const WishList = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    const [wishlist, setWishlist] = useState([]);
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [search, setSearch] = useState('');  // 선언 위치 변경
    const nav = useNavigate();
    const { page } = useParams();
    const postPerPage = 4;

    // 위시리스트 불러오기
    useEffect(() => {
        fetch(`http://localhost:8080/wishlist/${userInfo.userId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data);  // 데이터를 posts에 설정
                setCount(data.length);  // count에 데이터 길이 설정
                console.log(data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [userInfo.userId]); // 의존성 배열에 userInfo.userId를 추가하여 해당 값이 변경될 때만 재호출
    
    // 검색 및 페이지네이션 처리
    useEffect(() => {
        const indexOfLastPost = (page || currentPage) * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        setCurrentPosts(getSearchResult().slice(indexOfFirstPost, indexOfLastPost));
    }, [page, search, posts, currentPage]);

    const handleChangePage = (page) => {
        const newUrl = `/wishlist/${page}`;
        nav(newUrl);
        setCurrentPage(page);
    };

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === '' ? wishlist : wishlist.filter((it) => it.bookname.includes(search));
    };

    const handleDeleteAccount = async () => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (!userData) {
            alert("로그인이 필요합니다.");
            return;
        }

        const { email } = userData;

        try {
            const response = await axios.delete('http://localhost:8080/api/api/auth/deleteAccount', {
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
                                        <button className="sidebox_quitbutton" onClick={() => nav("/wishlist")}>위시리스트</button>
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
                            <div className="wishlist_list">
                                {currentPosts.map((item) => (
                                    <WishlistItem
                                        key={item.ISBN13}
                                        bookname={item.bookname}
                                        ISBN13={item.ISBN13}
                                    />
                                ))}
                            </div>
                            <Pagination page={currentPage} count={getSearchResult().length} handleChangePage={handleChangePage} postPerPage={postPerPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishList;
