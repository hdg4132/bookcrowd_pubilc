import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Editprofile.css";

const Editprofile = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userid, setUserid] = useState();
  const [emailDuplication, setEmailDuplication] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (userInfo != null) {
      setUserid(userInfo.userId);
    } else {
      navigate("/");
    }
  }, [navigate]);
  
  console.log(userid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  
  };
  

  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "*성함을 입력해 주세요";
    }

    if (!values.email) {
      errors.email = "*이메일을 입력해 주세요.";
    } else if (!emailDuplication) {
      errors.email = "*이메일 중복 확인을 해주세요.";
    }

    if (!values.password) {
      errors.password = "*비밀번호를 입력해 주세요.";
    } else if (values.password.length < 6) {
      errors.password = "*비밀번호는 6자 이상이어야 합니다.";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "*비밀번호 확인을 입력해 주세요.";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "*비밀번호가 일치하지 않습니다.";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "*휴대폰 번호를 입력해 주세요";
    }

    if (!values.address) {
      errors.address = "*주소를 입력해 주세요";
    }

    if (!values.detailAddress) {
      errors.detailAddress = "*상세 주소를 입력해 주세요";
    }
    return errors;
  };

  const checkEmailDuplication = async () => {
    if (!formValues.email) {
      alert("이메일을 입력해 주세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        'api/api/users/checkEmailDuplication',  // URL 수정
        { email: formValues.email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("서버 응답:", response.data);
      setEmailDuplication(response.data.success);
  
      if (response.data.success) {
        // 중복 확인 성공 시 이메일 오류 메시지 제거
        setFormErrors((prevErrors) => {
          const { email, ...otherErrors } = prevErrors;
          return otherErrors;
        });
      }
      setIsSubmit(false);
      alert(response.data.message);
    } catch (error) {
      console.error("이메일 중복 확인 중 오류:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };
  
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      try {
        const response = await axios.put("api/api/auth/editprofile", {
          name: formValues.userName,
          password: formValues.password,
          email: formValues.email,
          address: formValues.address,
          detailAddress: formValues.detailAddress,
          phoneNumber: formValues.phoneNumber,
          id: userid,
        });
        console.log("서버 응답:", response.data);
        alert("회원정보가 수정되었습니다.");
        navigate("/mypage");
      } catch (error) {
        if (error.response) {
          console.log("서버 응답 오류:", error.response.status, error.response.data);
          alert("서버 오류: " + error.response.data.message);
        } else if (error.request) {
          console.log("서버 응답이 없음:", error.request);
          alert("서버 응답이 없습니다.");
        } else {
          console.log("요청 설정 중 오류:", error.message);
          alert("요청 설정 중 오류가 발생했습니다.");
        }
      } finally {
        setIsSubmit(false);
      }
    }
  };
  

  return (
    <div>
      <div id="sub_banner">
        <div className="container_fix">
          <h2>회원정보 수정</h2>
          <p>회원정보를 수정하세요.</p>
        </div>
      </div>
      <main>
        <h3>회원정보 수정</h3>
        <form className="signup_form" onSubmit={handleUpdate}>
          <div className="signup_form_con">
            <label htmlFor="name">성함</label>
            <div>
              <input
                type="text"
                name="userName"
                id="name"
                value={formValues.userName}
                placeholder="성함을 입력하세요"
                onChange={handleChange}
              />
              {formErrors.userName && <p>{formErrors.userName}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="email">이메일</label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={formValues.email}
                placeholder="이메일을 입력하세요"
                onChange={handleChange}
              />
              <button type="button" className="btn_check" onClick={checkEmailDuplication}>중복 확인</button>
              {formErrors.email && <p className="emailerror">{formErrors.email}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="password">비밀번호</label>
            <div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formValues.password}
                  placeholder="비밀번호를 입력하세요"
                  onChange={handleChange}
                />
              </div>
              {formErrors.password && <p>{formErrors.password}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="password_check">비밀번호 확인</label>
            <div className="password_wrap">
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                placeholder="비밀번호 확인을 입력하세요"
                onChange={handleChange}
              />
              {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="phonenumber">휴대폰 번호</label>
            <div>
              <input
                type="text"
                name="phoneNumber"
                id="phonenumber"
                value={formValues.phoneNumber}
                placeholder="휴대폰 번호를 입력하세요"
                onChange={handleChange}
              />
              {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="address">주소</label>
            <div>
              <input
                type="text"
                name="address"
                value={formValues.address}
                placeholder="주소를 입력하세요"
                onChange={handleChange}
              />
              {formErrors.address && <p>{formErrors.address}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="detailAddress">상세 주소</label>
            <div>
              <input
                type="text"
                name="detailAddress"
                id="detailAddress"
                value={formValues.detailAddress}
                placeholder="상세주소를 입력하세요"
                onChange={handleChange}
              />
              {formErrors.detailAddress && <p>{formErrors.detailAddress}</p>}
            </div>
          </div>
          <div id="btn_signup">
            <Link to="/mypage" type="reset" className="btn_back">
              뒤로가기
            </Link>
            <button type="submit" className="btn_signup" disabled={isSubmit}>
              정보 수정
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Editprofile;
