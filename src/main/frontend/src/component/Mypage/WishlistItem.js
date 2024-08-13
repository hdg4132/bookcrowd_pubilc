import React from 'react';
import './WishlistItem.css';

const WishlistItem = ({ bookname, ISBN13 }) => {
    return (
        <div className="wishlist_item">
            <h3>{bookname}</h3>
            <p><strong>ISBN:</strong> {ISBN13}</p>
        </div>
    );
};

export default WishlistItem;
