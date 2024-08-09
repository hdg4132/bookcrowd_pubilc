// import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './component/reset.css';
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import RentList from "./pages/RentList";
import RentListAdm from "./pages/RentListAdm";
import RentWrite from "./pages/RentWrite";
import Header from "./component/Header";
import classNames from "classnames";
import RentView from "./pages/RentView";
import Rent_admin from "./component/Rent_Admin/Rent_admin";
import Rent_admin_return from "./component/Rent_Admin/Rent_admin_return";
import Rent_admin_canceled from "./component/Rent_Admin/Rent_admin_canceled";
import RentBookmatch from "./component/Rent_Admin/RentBookmatch";
import UserChatPage from "./component/realChat/UserChatPage";
import RealChatPage from "./component/realChat/RealChatPage";
import ChatPage from "./component/realChat/ChatPage";
// import Header from "./component/Header";

import KeepingList from "./component/BookKeeping/KeepingList";
import KeepingItem from "./component/BookKeeping/KeepingItem";
import KeepingRegister from "./component/BookKeeping/KeepingRegister";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Mypage from "./component/Mypage/Mypage";
import Editprofile from "./component/Editprofile/Editprofile";

import AdminRegisterBook from "./component/admin/AdminRegisterBook";
import AdminRegisterList from "./component/admin/AdminRegisterList";
import Home from "./component/Home";
import Footer from "./component/Footer";
import CommunityList from "./pages/board/CommunityList";
import CommunityDetail from "./pages/board/CommunityDetail";
import CommunityEdit from "./pages/board/CommunityEdit";
import CommunityEditChange from "./pages/board/CommunityEditChange";

// 현재 경로를 가져오기 위한 코드
const currentPath = window.location.pathname;

// /adm 경로에서는 헤더 노출되지 않도록 수정
const appClasses = currentPath.includes('/adm/') || currentPath.includes('/admin/') ? 'App header_hidden' : 'App';
function App() {




  return (
    <div className={appClasses}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 240722 sjh 책 대여하기 */}
        <Route path='/adm/rent/write' element={<RentWrite/>}/>
        <Route path='/adm/rent/' element={<RentListAdm/>}/>
        <Route path='/adm/rent/edit/:id' element={<RentWrite/>}/>
        <Route path='/rent' element={<RentList/>}/>
        <Route path="/rent/:id" element={<RentView />} />
        {/* //240722 sjh 책 대여하기 */}
        <Route path="/books" element={<KeepingList />} />
        <Route path="/register" element={<KeepingRegister />} />
        <Route path="/book/:id" element={<KeepingItem />} />
        <Route path="/adm/list" element={<AdminRegisterList />} />
        <Route path="/adm/register" element={<AdminRegisterBook />} />
        <Route path="/rent_admin" element={<Rent_admin />} />
        <Route path="/rent_admin_return" element={<Rent_admin_return />} />
        <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />
        <Route path="/userchat" element={<UserChatPage />} />
        <Route path="/realchat" element={<RealChatPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/bookmatch" element={<RentBookmatch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editprofile" element={<Editprofile />} />
        {/* 240805 kwj 커뮤니티 */}
        <Route path="/community" element={<CommunityList />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/communityEdit" element={<CommunityEdit />} />
        <Route path="/communityEditChange/:id" element={<CommunityEditChange />} />
        {/* 240805 kwj 커뮤니티 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
