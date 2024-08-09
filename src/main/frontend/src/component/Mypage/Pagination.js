import React from "react";

function Pagination({ totalItems, itemsPerPage, onPageChange, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
//
    if (pageNumbers.length <= 1) return null; // 페이지가 1개 이하라면 렌더링하지 않음

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage + 1 === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number - 1)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
