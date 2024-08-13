import React from 'react';
import './WishlistItem.css';

const WishlistItem = ({ isbn, userId }) => {
    return (
        <div className="wishlist_item">
            <h3><strong>ISBN:</strong> {isbn}</h3>
            <p><strong>User ID:</strong> {userId}</p>
        </div>
    );
};

export default WishlistItem;
