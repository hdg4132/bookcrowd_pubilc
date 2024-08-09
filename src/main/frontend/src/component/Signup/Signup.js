import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Text1 from "./SignupText1";
import Text2 from "./SignupText2";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
    userType: "1",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);
  const [emailDuplication, setEmailDuplication] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "*성함을 입력해 주세요";
    }

    if (!values.email) {
      errors.email = "*이메일을 입력해 주세요.";
    } else if (!emailDuplication) {
      errors.email = "*중복된 이메일이 있습니다.";
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

    if (!values.phoneuserNumber) {
      errors.phoneuserNumber = "*휴대폰 번호를 입력해 주세요";
    }

    if (!values.address) {
      errors.address = "*주소를 입력해 주세요";
    }

    if (!values.detailuserNddress) {
      errors.detailuserNddress = "*상세 주소를 입력해 주세요";
    }

    return errors;
  };

  const checkEmailDuplication = async () => {
    if (!formValues.email) {
      alert("이메일을 입력해 주세요.");
      return;
    }
  
    try {
      const response = await axios.post('api/api/users/checkEmailDuplication',
        {email:formValues.email}, // 이메일을 직접 보내는 경우
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("서버 응답:", response.data);
      setEmailDuplication(response.data.success);
  
      if (response.data.success) {
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (!agreeToPolicy) {
      alert("개인정보 처리방침에 동의해 주세요.");
      return;
    }

    if (!agreeToTerms) {
      alert("이용약관에 동의해 주세요.");
      return;
    }

    if (true) {
            
      try {
        await axios.post("api/api/auth/signUp", formValues);
        alert('회원가입 완료');
        window.location.href = '/login';
      } catch (error) {
        if (error.response) {
          console.log(
            "서버 응답 오류:",
            error.response.status,
            error.response.data
          );
          alert("서버 오류: " + error.response.data.message);
        } else if (error.request) {
          console.log("서버 응답이 없음:", error.request);
          alert("서버 응답이 없습니다.");
        } else {
          console.log("요청 설정 중 오류:", error.message);
          alert("요청 설정 중 오류가 발생했습니다.");
        }
      } finally {
      }
    }
  };

  return (
    <div>
      <div id="sub_banner">
        <div className="container_fix">
          <h2>Join</h2>
          <p>회원가입</p>
        </div>
      </div>
      <main>
        <h3>회원가입</h3>
        <form className="signup_form" onSubmit={handleSubmit}>
          <div className="signup_form_con">
            <label htmlFor="name">성함</label>
            <div>
              <input
                type="text"
                id="name"
                value={formValues.name}
                placeholder="성함"
                onChange={handleChange}
              />
              {formErrors.name && <p>{formErrors.name}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="email">이메일 주소</label>
            <div className="mail_input_wrap">
              <div className="mail_input">
                <div>
                  <input
                    type="email"
                    id="email"
                    value={formValues.email}
                    placeholder="이메일 주소"
                    onChange={handleChange}
                  />
                  {formErrors.email && <p>{formErrors.email}</p>}
                </div>
                <button
                  type="button"
                  className="btn_check"
                  onClick={checkEmailDuplication}
                >
                  중복 확인
                </button>
              </div>
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="password">비밀번호</label>
            <div>
              <input
                type="password"
                id="password"
                value={formValues.password}
                placeholder="비밀번호"
                onChange={handleChange}
              />
              {formErrors.password && <p>{formErrors.password}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div className="password_wrap">
              <input
                type="password"
                id="confirmPassword"
                value={formValues.confirmPassword}
                placeholder="비밀번호 확인"
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <p>{formErrors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="phoneNumber">휴대폰 번호</label>
            <div>
              <input
                type="text"
                id="phoneNumber"
                value={formValues.phoneNumber}
                placeholder="휴대폰 번호"
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
                id="address"
                value={formValues.address}
                placeholder="주소"
                onChange={handleChange}
              />
              {formErrors.address && <p>{formErrors.address}</p>}
            </div>
          </div>
          <div className="signup_form_con">
            <label htmlFor="detailAddress">상세주소</label>
            <div>
              <input
                type="text"
                id="detailAddress"
                value={formValues.detailAddress}
                placeholder="상세주소"
                onChange={handleChange}
              />
              {formErrors.detailAddress && <p>{formErrors.detailAddress}</p>}
            </div>
          </div>
          <div className="signup_form_policybox">
            <p>개인정보 처리방침</p>
            <div className="policy_box">
             <Text1 />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeToPolicy"
                checked={agreeToPolicy}
                onChange={() => setAgreeToPolicy(!agreeToPolicy)}
              />
              <label htmlFor="agreeToPolicy">개인정보 처리방침에 동의합니다</label>
            </div>
          </div>
          <div className="signup_form_TermsofUse">
            <p>이용약관</p>
            <div className="TermsofUse">             
             <Text2 />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label htmlFor="agreeToTerms">이용약관에 동의합니다</label>
            </div>
          </div>
          <div id="btn_signup">
            <Link to="/login" className="btn_back">
              뒤로가기
            </Link>
            <button type="submit" className="btn_signup" onClick={handleSubmit} disabled={isSubmit} >
              회원가입
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Signup;
