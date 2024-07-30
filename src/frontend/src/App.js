import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from "./component/Main";
import Rent from "./component/Rent";
import Rent_admin from "./component/Rent_admin";
import Rent_admin_canceled from "./component/Rent_admin_canceled";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
import Header from "./component/Header";
import Editprofile from "./pages/Editprofile/Editprofile"

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/rent_admin" element={<Rent_admin />} />
                <Route path="/rent_admin_canceled" element={<Rent_admin_canceled />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/editprofile" element={<Editprofile />} />
            </Routes>
        </div>
    );
}

export default App;
