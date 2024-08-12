import React from 'react'
import Pagination from 'react-js-pagination'

const Paging = ({ page, count, handleChangePage, postPerPage }) => {
    return (
        <div className='mypage_pagination'>
            <Pagination
                activePage={Number(page)}
                itemsCountPerPage={postPerPage}
                totalItemsCount={count}
                pageRangeDisplayed={10}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handleChangePage}
            />
        </div>
    )
}

export default Paging;
