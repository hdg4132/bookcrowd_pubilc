import React, { useState } from 'react';
import "./Pagination.css"

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  // 현재 페이지 상태를 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수를 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  // 이전 페이지로 이동하는 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  // 페이지 번호를 렌더링하는 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <ul className="pagination">
        <li className="prev"><button onClick={handlePreviousPage}>&#8249;</button></li>
        {renderPageNumbers()}
        <li className="next"><button onClick={handleNextPage}>&#8250;</button></li>
      </ul>
    </div>
  );
};

export default Pagination;
