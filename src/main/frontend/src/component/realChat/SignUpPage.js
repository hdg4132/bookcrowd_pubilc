import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUpPage.css"

const SignUpPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        userType: 'user'
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
        axios.post('http://localhost:8080/api/auth/signUp', form)
            .then(response => {
                alert(response.data.message);
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error signing up!', error);
                alert('회원가입에 실패하였습니다.');
            });
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className='email'>
                    <label>이메일:</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className='password'>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className='passwordcheck'>
                    <label>비밀번호 확인:</label>
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                </div>
                <div className='name'>
                    <label>이름:</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className='pnumber'>
                    <label>전화번호:</label>
                    <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpPage;