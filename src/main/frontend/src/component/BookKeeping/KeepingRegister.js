// import React, {useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../assets/css/style.css"

// export default function KeepingRegister() {
//   const [formData, setFormData] = useState({
//     bookName:"",
//     isbn:"",
//     rentable: "yes",
//     note:""
//   });
//   const navigate = useNavigate();

//   const userId = JSON.parse(sessionStorage.getItem("userData")).userId;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const requestData = {
//       ...formData,
//       userId: userId,
//       rentable: formData.rentable === "yes"
//     };
//     axios.post(`/api/keepings`, requestData)
//     .then(response => {
//       console.log("Keeping request submitted successfully");
//       navigate('/');
//     })
//     .catch(error => {
//       console.error("Error submitting keeping request:", error);
//     });
//   };

//   return (
//     <>
//       <div className="book-keeping-register-container">
//         <form onSubmit={handleSubmit}>
//           <div className="book-keeping-register-container-flex0">
//             <span>도서 명</span>
//             <input type="text" id="book-name" name="bookName" value={formData.bookName} onChange={handleChange}/>
//           </div>
//           <div className="book-keeping-register-container-flex1">
//             <span>ISBN 넘버</span>
//             <input type="text" id="isbn-number" name="isbn" maxLength={13} placeholder="숫자 13자리 - 없이" value={formData.isbn} onChange={handleChange} />
//           </div>
//           <div className="book-keeping-register-container-flex2">
//             <span>대여가능 여부</span>
//             <label>
//               <input type="radio" name="rentable" value="yes" checked={formData.rentable === "yes"} onChange={handleChange}/>
//               대여를 허가합니다.
//             </label>
//             <label>
//               <input type="radio" name="rentable" value="no" checked={formData.rentable === "no"} onChange={handleChange}/>
//               대여를 불허합니다.
//             </label>
//           </div>
//           <div className="book-keeping-register-container-flex3">
//             <span>비고</span>
//             <textarea placeholder="이책은..." id="remarks" name="note" value={formData.note} onChange={handleChange}></textarea>
//           </div>
//           <div className="book-keeping-register-container-flex4">
//             <span>
//               개인정보
//               <br />
//               처리방침
//             </span>
//             <textarea className="privacy-policy" readOnly>
//               개인정보 처리방침에 동의합니다.
//             </textarea>
//           </div>
//           <div className="book-keeping-register-radio">
//             <label>
//               <input type="radio" name="privacy" value="agree" required />
//               개인정보 처리방침에 동의합니다.
//             </label>
//           </div>
//           <div className="book-keeping-register-container-flex5">
//             <span>이용약관</span>
//             <textarea id="terms-of-use" readOnly>
//               이용약관에 동의합니다.
//             </textarea>
//           </div>
//           <div className="book-keeping-register-radio">
//             <label>
//               <input type="radio" name="terms" value="agree" required />
//               개인정보 처리방침에 동의합니다.
//             </label>
//           </div>
//           <div className="book-keeping-register-btn">
//             <button onClick={() => navigate("/books")}>목록</button>
//             <button type="submit">글쓰기</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/style.css"
import TermsKeeping from "../../util/TermsKeeping";
import TermsKeeping1 from "../../util/TermsKeeping1";

export default function KeepingRegister() {
  const [formData, setFormData] = useState({
    bookName:"",
    isbn:"",
    rentable: "yes",
    note:""
  });
  const navigate = useNavigate();

  const userId = JSON.parse(sessionStorage.getItem("userData")).userId;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      userId: userId,
      rentable: formData.rentable === "yes"
    };
    axios.post(`/api/keepings`, requestData)
    .then(response => {
      console.log("Keeping request submitted successfully");
      navigate('/');
    })
    .catch(error => {
      console.error("Error submitting keeping request:", error);
    });
  };

  return (
    <>
      <div className="book-keeping-register-container">
        <form onSubmit={handleSubmit}>
          <div className="book-keeping-register-container-flex0">
            <span>도서 명</span>
            <input type="text" id="book-name" name="bookName" value={formData.bookName} onChange={handleChange}/>
          </div>
          <div className="book-keeping-register-container-flex1">
            <span>ISBN 넘버</span>
            <input type="text" pattern="\d*" title="13자리 숫자로 입력하세요" id="isbn-number" name="isbn" maxLength={13} placeholder="숫자 13자리 - 없이" value={formData.isbn} onChange={handleChange} />
          </div>
          <div className="book-keeping-register-container-flex2">
            <span>대여가능 여부</span>
            <label>
              <input type="radio" name="rentable" value="yes" checked={formData.rentable === "yes"} onChange={handleChange}/>
              대여를 허가합니다.
            </label>
            <label>
              <input type="radio" name="rentable" value="no" checked={formData.rentable === "no"} onChange={handleChange}/>
              대여를 불허합니다.
            </label>
          </div>
          <div className="book-keeping-register-container-flex3">
            <span>비고</span>
            <textarea placeholder="이책은..." id="remarks" name="note" value={formData.note} onChange={handleChange}></textarea>
          </div>
          <TermsKeeping1 />
          <div className="book-keeping-register-radio">
            <label>
              <input type="radio" name="privacy" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <TermsKeeping />
          <div className="book-keeping-register-radio">
            <label>
              <input type="radio" name="terms" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <div className="book-keeping-register-btn">
            <button onClick={() => navigate("/books")}>목록</button>
            <button type="submit">글쓰기</button>
          </div>
        </form>
      </div>
    </>
  );
}
