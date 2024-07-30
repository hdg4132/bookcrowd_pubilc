import React from "react";

import "../../assets/css/style.css"

export default function KeepingItem() {
    return(
        <>
        <div class="book-keeping-item-container">
      <table>
        <tbody>
          <tr>
            <td class="col1">도서명</td>
            <td class="col2">연락처</td>
          </tr>
          <tr>
            <td class="col1">ISBN 넘버</td>
            <td class="col2">연락처</td>
          </tr>
          <tr>
            <td class="col1">대여가능 여부</td>
            <td class="col2">연락처</td>
          </tr>
          <tr>
            <td class="col1">비고</td>
            <td class="col2">연락처</td>
          </tr>
          <tr>
            <td class="col1">개인정보 활용동의</td>
            <td class="col2">연락처</td>
          </tr>
          <tr>
            <td class="col1">이용약관 동의</td>
            <td class="col2">연락처</td>
          </tr>
        </tbody>
      </table>
      <div class="button-container">
        <button>반환신청하기</button>
      </div>
      <div class="pagination-item">
        <span>&lt; Prev</span>
        <span>&#9776; List</span>
        <span>Next &gt;</span>
      </div>
    </div>
        </>
    )
}