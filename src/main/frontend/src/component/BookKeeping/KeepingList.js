import React from "react";

import "../../assets/css/style.css"

export default function KeepingList() {
  return (
    <>
      <div class="book-keeping-container">
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th class="col-status">보관상태</th>
              <th class="col-author">작성자</th>
              <th class="col-date">게시일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
            </tr>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
            </tr>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
            </tr>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
            </tr>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
            </tr>
            <tr>
              <td class="col-title">게시글 제목이 노출됩니다.</td>
              <td class="col-status">보관중</td>
              <td class="col-author">작성자명</td>
              <td class="col-date">2024.05.27</td>
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
      </div>
    </>
  );
}
