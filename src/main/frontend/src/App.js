import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Rent from "./component/Rent";
import axios from "axios";
import Rent_admin from "./component/Rent_Admin/Rent_admin";
import Rent_admin_return from "./component/Rent_Admin/Rent_admin_return"
import Rent_admin_canceled from "./component/Rent_Admin/Rent_admin_canceled";
import RentBookmatch from "./component/Rent_Admin/RentBookmatch";
import UserChatPage from "./component/realChat/UserChatPage";
import RealChatPage from "./component/realChat/RealChatPage";
import ChatPage from "./component/realChat/ChatPage";
import Header from "./component/Header";

import KeepingList from "./component/BookKeeping/KeepingList";
import KeepingItem from "./component/BookKeeping/KeepingItem";
import KeepingRegister from "./component/BookKeeping/KeepingRegister";

import AdminRegisterBook from "./component/admin/AdminRegisterBook";
import AdminRegisterList from "./component/admin/AdminRegisterList";

function App() {

  return (
    <div className="App">
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/books" element={<KeepingList />} />
        <Route path="/register" element={<KeepingRegister />} />
        <Route path="/book/:id" element={<KeepingItem />} />
        <Route path="/admin/list" element={<AdminRegisterList />} />
        <Route path="/admin/register" element={<AdminRegisterBook />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/rent_admin" element={<Rent_admin />} />
        <Route path="/rent_admin_return" element={<Rent_admin_return />} />
        <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />
        <Route path="/userchat" element={<UserChatPage />} />
        <Route path="/realchat" element={<RealChatPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/bookmatch" element={<RentBookmatch />} />
      </Routes>
    </div>
  );
}

export default App;
