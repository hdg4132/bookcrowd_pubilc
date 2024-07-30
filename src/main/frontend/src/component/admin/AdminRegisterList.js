import React from "react";

import "../../assets/css/style.css"

export default function AdminRegisterList() {
  return (
    <>
      <div class="book-keeping-admin-container">
        <section class="member-management">
          <div class="member-flex">
            <h1>회원관리</h1>
            <div class="search-container">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                class="search-input"
              />
              <button class="search-button">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th class="col1">회원 아이디</th>
                <th class="col2">도서명</th>
                <th class="col3">ISBN</th>
                <th class="col4">대여가능여부</th>
                <th class="col5">비고</th>
                <th class="col6">상태</th>
                <th class="col7">대여 게시글쓰기</th>
                <th class="col8">상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
              <tr>
                <td class="col1">작성자명</td>
                <td class="col2">작성자명</td>
                <td class="col3">작성자명</td>
                <td class="col4">작성자명</td>
                <td class="col5">작성자명</td>
                <td class="col6">
                  <select>
                    <option>승인 대기</option>
                    <option>승인 대기 중</option>
                    <option>승인완료</option>
                    <option>보관 중</option>
                    <option>대여중</option>
                    <option>반환신청</option>
                    <option>반환완료</option>
                  </select>
                </td>
                <td class="col7">
                  <button class="book-keeping-admin-btn1">책정보입력</button>
                </td>
                <td class="col8">
                  <button class="book-keeping-admin-btn2">수정완료</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-list">
            <button>&laquo;</button>
            <button>&lsaquo;</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>&rsaquo;</button>
            <button>&raquo;</button>
          </div>
        </section>
      </div>
    </>
  );
}
