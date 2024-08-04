// import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './component/reset.css';
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import RentList from "./pages/RentList";
import RentListAdm from "./pages/RentListAdm";
import RentWrite from "./pages/RentWrite";
import Header from "./component/Header";
import Storage from "./pages/Storage"
import classNames from "classnames";
import RentView from "./pages/RentView";
import UserChatPage from "./component/realChat/UserChatPage";
import RealChatPage from "./component/realChat/RealChatPage";
import ChatPage from "./component/realChat/ChatPage";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Mypage from "./component/Mypage/Mypage";
// 현재 경로를 가져오기 위한 코드
const currentPath = window.location.pathname;

// /adm 경로에서는 헤더 노출되지 않도록 수정
const appClasses = currentPath.includes('/adm/') ? 'App header_hidden' : 'App';
function App() {
  // const [hello, setHello] = useState('')

  // useEffect(() => {
  //   axios.get('api/api/book/11')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);



  return (
    <div className={appClasses}>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 240722 sjh 책 대여하기 */}
        <Route path='/adm/storage' element={<Storage/>}/>
        <Route path='/adm/rent/write' element={<RentWrite/>}/>
        <Route path='/adm/rent/' element={<RentListAdm/>}/>
        <Route path='/adm/rent/edit/:id' element={<RentWrite/>}/>
        <Route path='/rent' element={<RentList/>}/>
        <Route path="/rent/:id" element={<RentView />} />
        <Route path="/rent_admin" element={<Rent_admin />} />
        <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />
        <Route path="/userchat" element={<UserChatPage />} />
        <Route path="/realchat" element={<RealChatPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
