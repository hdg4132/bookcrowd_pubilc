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



    //검색 초기데이터 빈칸
    const [search, setSearch] = useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }




    //검색 필터링 함수
    const getSearchResult = () => {
        //원하는 데이터만 남기려면>원치않는 데이터 빼기
        //검색창이 빈칸이면 데이터 전체표시, 아니라면 검색창안의 데이터를 전부 소문자로바꿔서 포함하고 있는 데이터만 남기기
        return search === '' ? posts : posts.filter((it) => it.bookname.includes(search)) //  app.js에서 프롭스로 가져와서 쓸수있긴한데 각각의 항목안에 컨텐츠<에서 같은 걸 찾는거라 정확하게 지목을 list에서 하는게 좀더편해서 리스트에서 작성하는거고
    }


    /* 페이지네이션 */

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
            console.log(response.data); // 로그아웃 완료 메시지
            sessionStorage.removeItem("userData"); // 클라이언트 측 세션 정보 삭제
            nav("/login"); // 로그인 페이지로 리다이렉트
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
            const response = await axios.delete('api/api/auth/deleteAccount', {
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
            <SubBanner page_name={"storage"} title_en={"My page"} title_kr={"마이페이지"} search />
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
                    <ul className="booklist_con">
                        {currentPosts && currentPosts.map((it) => (
                            <RentItem key={it.id}{...it} />))}
                    </ul>
                </div>
            </div>

            <div className="content_tail">
                <div className="mypage_container">
                    {userInfo != null ? <div className="btn_list">
                    </div> : ''}


                </div>
            </div>

        </div>
        <Pagination page={page || currentPage} count={count} handleChangePage={handleChangePage} postPerPage={postPerPage} />
        </div>
    )
}

export default MyPage;
