import React from "react";

import "../../assets/css/style.css"

export default function KeepingRegister() {
  return (
    <>
      <div class="book-keeping-register-container">
        <form>
          <div class="book-keeping-register-container-flex0">
            <span>도서 명</span>
            <input type="text" id="book-name" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>ISBN 넘버</span>
            <input type="text" id="isbn-number" />
          </div>
          <div class="book-keeping-register-container-flex2">
            <span>대여가능 여부</span>
            <label>
              <input type="radio" name="rental" value="yes" />
              대여를 허가합니다.
            </label>
            <label>
              <input type="radio" name="rental" value="no" />
              대여를 불허합니다.
            </label>
          </div>
          <div class="book-keeping-register-container-flex3">
            <span>비고</span>
            <textarea placeholder="이책은..." id="remarks"></textarea>
          </div>
          <div class="book-keeping-register-container-flex4">
            <span>
              개인정보
              <br />
              처리방침
            </span>
            <textarea class="privacy-policy" readonly>
              개인정보 처리방침에 동의합니다.
            </textarea>
          </div>
          <div class="book-keeping-register-radio">
            <label>
              <input type="radio" name="privacy" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <div class="book-keeping-register-container-flex5">
            <span>이용약관</span>
            <textarea id="terms-of-use" readonly>
              이용약관에 동의합니다.
            </textarea>
          </div>
          <div class="book-keeping-register-radio">
            <label>
              <input type="radio" name="terms" value="agree" required />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>
          <div class="book-keeping-register-btn">
            <button type="button">목록</button>
            <button type="submit">글쓰기</button>
          </div>
        </form>
      </div>
    </>
  );
}
