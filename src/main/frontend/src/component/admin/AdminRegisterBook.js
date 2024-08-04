import React from "react";

import "../../assets/css/style.css"
import AdmLayout from "../AdmLayout";

export default function AdminRegisterBook() {
  return (
    <>
      <AdmLayout/>
      <div class="book-keeping-register-container adm_con">
        <form>
          <div class="book-keeping-register-container-flex0">
            <span>도서 명</span>
            <input type="text" id="title" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>저자</span>
            <input type="text" id="author" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>출판사</span>
            <input type="text" id="publisher" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>출간일</span>
            <input type="text" id="publishDate" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>페이지수</span>
            <input type="text" id="pages" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>ISBN</span>
            <input type="text" id="isbn" />
          </div>
          <div class="book-keeping-register-container-flex1">
            <span>장르</span>
            <input type="text" id="genre" />
          </div>

          <div class="book-keeping-register-container-flex3">
            <span>책내용</span>
            <textarea placeholder="이책은..." id="plots"></textarea>
          </div>
          <div class="book-keeping-register-container-flex4">
            <span>이미지</span>

            <input type="file" id="image" accept="image/*" class="file-input" />
            <img
              id="preview"
              src=""
              alt="Image Preview"
              class="image-preview"
            />
          </div>
          <div class="book-keeping-register-btn">
            <button type="button">뒤로가기</button>
            <button type="submit">대여 등록</button>
          </div>
        </form>
      </div>
    </>
  );
}
