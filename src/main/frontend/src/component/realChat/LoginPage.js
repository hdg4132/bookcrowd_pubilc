import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

const LoginPage = () => {
    // const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/login', form)
            .then(response => {
                // alert(response.data.message);
                console.log(response.data)
                sessionStorage.setItem(response.data)
                // navigate('/userchat');
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
                alert('로그인에 실패하였습니다.');
            });
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginPage;