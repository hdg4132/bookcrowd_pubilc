import React from 'react';
import './WishlistItem.css';

const WishlistItem = ({ bookId, bookImgUrl, bookName, author, publisher, description}) => {
    return (
        <div className="wishlist_item">
            <a href={'/rent/'+bookId}>
                <div className='wishlist_img'>
                    <img src={`http://localhost:8080/files/${bookImgUrl}`}/>
                </div>
                <div className='wishlist_con'>
                    <h4 className='wishlist_title'>{bookName}</h4>
                    <ul className="wishlist_info">
                        <li>저자: {author}</li>
                        <li>출판사: {publisher}</li>
                    </ul>
                </div>

            </a>
        </div>
    );
};

export default WishlistItem;
